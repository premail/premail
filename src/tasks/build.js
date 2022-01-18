'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const { pipeline } = require('stream')
const fs = require('fs-extra')
const path = require('path')
const gulpif = require('gulp-if')
const tap = require('gulp-tap')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const sassImporter = require('node-sass-json-importer')
const Fiber = require('fibers') // Depreciated in Node 15-16
const Handlebars = require('handlebars')
const mjml = require('mjml')
const { det } = require('detergent')
const { stripHtml } = require('string-strip-html')
const { alts } = require('html-img-alt')
const { crush } = require('html-crush')
const typeset = require('typeset')
const map = require('map-stream')
const { htmlToText } = require('html-to-text')
const filesize = require('filesize')

const e = require.main.require('./src/ops/errors')
const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { templates } = require.main.require('./src/config/templates')
const { design } = require.main.require('./src/config/design')
const { sassImport } = require.main.require('./src/config/sassImport')
const { flags } = require.main.require('./src/ops/flags')
const notify = require.main.require('./src/ops/notifications')
const { findOccurrences } = require.main.require(
  './src/helpers/findOccurrences'
)
/* eslint-enable no-unused-vars */

//
// Create in-memory container for files as they are built
//
const built = {
  styles: {},
  content: {},
}

//
// Build styles from Sass source files.
//
function styles () {
  // Set styles source
  const sourceStyles = config.current.design.path + '/**/*.scss'

  return pipeline(
    src(sourceStyles),

    // Build CSS
    sass({
      fiber: Fiber,
      outputStyle: 'compressed',
      importer: sassImporter({
        resolver: function (dir, url) {
          return url.startsWith('~/')
            ? path.resolve(path.join(config.src, 'config'), url.substr(2))
            : path.resolve(dir, url)
        },
      }),
    }),

    // Save built CSS to memory
    tap(function (file) {
      const contents = file.contents.toString()
      built.styles[path.basename(file.path)] = contents
      config.partials[
        path.basename(file.path, path.extname(file.path))
      ] = contents
    }),

    err => {
      if (err) {
        e.e(err, 'sass')
        process.exit(1)
      } else {
        notify.msg('success', 'Styles built.')
      }
    }
  )
}

//
// Build content from templates.
//
function content () {
  // Set typography options based on configuration
  config.typography = {
    detergent: config.file.internal.typography.detergent,
    typeset: config.file.internal.typography.typeset,
  }

  // Override default typography settings with configuration
  config.typography.detergent.options.convertApostrophes =
    config.design.typography.convertQuoteAndApostrophe
  config.typography.detergent.options.convertDashes =
    config.design.typography.convertDash
  config.typography.detergent.options.convertDotsToEllipsis =
    config.design.typography.convertEllip
  config.typography.typeset.css.opticallyAlignLetters =
    config.design.typography.opticallyAlignLetters
  config.typography.typeset.css.enableSmallCaps =
    config.design.typography.enableSmallCaps

  // Report typographical enhancements
  if (flags.debug) {
    notify.unjson(
      config.typography,
      'The following typographical enhancements will be performed:'
    )
  }

  // Disable applicable Typeset options
  const typesetDisable = []
  Object.keys(config.typography.typeset.options).forEach(key => {
    if (!config.typography.typeset.options[key]) {
      typesetDisable.push(key)
    }
  })

  return pipeline(
    src(config.current.templates.array),

    // Check for void/singleton elements in partials and warn
    tap(function (file) {
      const contents = file.contents.toString()
      const filename = path.basename(file.path)

      if (
        filename !== config.design.templates.main &&
        !config.current.templates.names.includes(filename)
      ) {
        findOccurrences(/\/>/gim, contents).forEach(result =>
          notify.msg(
            'warn',
            config.file.internal.messages.voidTags,
            `${filename} contains void element at ${result.lineNumber}:${result.column}`
          )
        )
      }
    }),

    // Typographic enhancements: Detergent
    tap(function (file) {
      const results = det(
        file.contents.toString(),
        config.typography.detergent.options
      )
      file.contents = Buffer.from(results.res)
    }),

    // Typographic enhancements: Typeset
    tap(function (file) {
      const results = typeset(file.contents.toString(), {
        disable: typesetDisable,
      })
      file.contents = Buffer.from(results)
    }),

    // Save built content to memory
    tap(function (file) {
      const contents = file.contents.toString()
      built.content[path.basename(file.path)] = contents
      config.partials[
        path.basename(file.path, path.extname(file.path))
      ] = contents
    }),

    // Error handling
    err => {
      if (err) {
        e.e(err)
        process.exit(1)
      } else {
        notify.msg('success', 'Content built.')
      }
    }
  )
}

//
// Build structure from styles + content.
//
function structure (cb) {
  // Default build options
  const htmlBuild = {
    file: 'index.html',
    mjml: config.file.internal.htmlBuild.mjml.dev,
    crush: config.file.internal.htmlBuild.crush,
  }
  const textBuild = {
    file: 'index.txt',
    status: false,
  }

  // Set production options
  if (flags.prod) {
    htmlBuild.mjml = config.file.internal.htmlBuild.mjml.prod
    notify.msg('info', config.file.internal.messages.productionBuild)
  }

  // Set template extension
  htmlBuild.mjml.fileExt = config.templates.ext

  // Set email text build options
  if (config.email) {
    if (config.email.text.generate) {
      textBuild.status = true
      textBuild.options = config.file.internal.textBuild.options
      textBuild.options.baseElement = []
      textBuild.include = {
        images: {},
        partials: {},
      }

      // Load project-configurable CSS selectors to skip
      if (config.email.text.skipSelectors) {
        textBuild.options.selectors = []
        config.email.text.skipSelectors.forEach(element => {
          const obj = {
            selector: element,
            format: 'skip',
          }
          textBuild.options.selectors.push(obj)
        })
      }

      // Include image URIs if requested
      if (config.email.text.images) {
        textBuild.include.images = true
        delete textBuild.options.tags.img
      } else {
        textBuild.include.images = false
      }

      // Override default partial includes with email config, if set, and name
      // base elements
      Object.keys(config.email.text.include).forEach(key => {
        Object.assign(textBuild.include.partials, config.email.text.include)
        if (config.email.text.include[key] === true) {
          textBuild.options.baseElement.push('div.component-' + key)
        }
      })
    } else {
      notify.msg('info', config.file.internal.messages.plaintextOff)
    }
  }

  // Warn if both Google Font and custom web font are enabled.
  if (
    config.design.fonts.stack.google.enabled &&
    config.design.fonts.stack.custom.enabled
  ) {
    notify.msg('warn', config.file.internal.messages.multipleWebFonts)
  }

  // Be sure source template exists.
  if (!fs.existsSync(config.current.templates.main)) {
    notify.msg('error', config.file.internal.messages.templateMissing)
    cb()
  } else {
    // Register Handlebars partials (any include is a partial)
    const partials = { ...built.styles, ...built.content }
    for (const key in partials) {
      Handlebars.registerPartial(`${key}`, partials[key])
    }

    // #eq Handlebars helper
    Handlebars.registerHelper('eq', function (a, b, opts) {
      if (a === b) {
        return opts.fn(this)
      } else {
        return opts.inverse(this)
      }
    })

    return pipeline(
      src(config.current.templates.main),

      // Process Handlebars data
      tap(function (file, t) {
        const contents = file.contents.toString()
        const format = Handlebars.compile(contents, {
          strict: true,
        })
        // Add in the Handlebars data (config)
        const processedTemplate = format(config)
        file.contents = Buffer.from(processedTemplate, 'utf-8')
        notify.msg('debug', config.file.internal.messages.completeHandlebars)
      }),

      // Write the intermediate rendered template to disk if requested.
      tap(function (file) {
        if (flags.temp) {
          const templateIntermediate = file.contents.toString()
          fs.writeFileSync(config.current.templates.int, templateIntermediate)
          notify.msg(
            'info',
            config.current.templates.int,
            'Rendered MJML template written to disk:'
          )
        }
      }),

      // Compile MJML into HTML
      tap(function (file) {
        const render = mjml(file.contents.toString(), htmlBuild.mjml)
        file.contents = Buffer.from(render.html)
        notify.msg('debug', config.file.internal.messages.completeMJML)
      }),

      // Enforce proper image alt tags if set
      tap(function (file) {
        if (config.design.a11y.enforceImageAlt) {
          file.contents = Buffer.from(alts(file.contents.toString()))
        }
      }),

      // Filter and measure the HTML file
      tap(function (file) {
        const minified = crush(file.contents.toString(), htmlBuild.crush)
        const size = Number(
          Buffer.byteLength(Buffer.from(minified.result), 'utf8')
        )
        const renderedSize = filesize(size)

        if (size < Number('100000')) {
          notify.msg('info', `Email file size is ${renderedSize} (minified).`)
        } else {
          notify.msg(
            'warn',
            'Gmail is known to clip emails with a file size larger than 100 kB\n   For more information, see:\n   https://github.com/hteumeuleu/email-bugs/issues/41',
            `Large email file size: ${renderedSize} (minified).`
          )
        }

        if (flags.prod) {
          file.contents = Buffer.from(minified.result)
        } else {
          // @TODO: Create a prettier (or prettier-like) filter on the dev
          // version of the HTML file.
        }
      }),

      // Write HTML version
      rename(htmlBuild.file),
      dest(config.current.dist),

      // Plain-text conversion
      gulpif(
        textBuild.status,
        tap(function (file) {
          file.contents = Buffer.from(
            htmlToText(file.contents.toString(), textBuild.options)
          )
        })
      ),

      // Write plain-text file
      gulpif(textBuild.status, rename(textBuild.file)),
      gulpif(textBuild.status, dest(config.current.dist)),

      // Error handling
      err => {
        if (err) {
          e.e(err)
          process.exit(1)
        } else {
          notify.msg('success', `Email complete at ${config.current.dist}`)
        }
      }
    )
  }
}

module.exports = {
  styles,
  content,
  structure,
}
