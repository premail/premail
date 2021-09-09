'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const { pipeline } = require('stream')
const fs = require('fs')
const path = require('path')
const gulpif = require('gulp-if')
const tap = require('gulp-tap')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const sassImporter = require('node-sass-json-importer')
const Fiber = require('fibers') // Depreciated in Node 16
const Handlebars = require('handlebars')
const helpers = require('handlebars-helpers')(['comparison'])
const mjml = require('gulp-mjml')
const mjmlEngine = require('mjml')
const { det } = require('detergent')
const { stripHtml } = require('string-strip-html')
const { alts } = require('html-img-alt')
const { crush } = require('html-crush')
const typeset = require('typeset')
const transform = require('vinyl-transform')
const map = require('map-stream')
const { htmlToText } = require('html-to-text')

const e = require('../functions/e.js')
const { config } = require('../vars/config.js')
const { flags } = require('../vars/flags.js')
const notify = require('../vars/notify.js')
const { findOccurrences } = require('../functions/findOccurrences.js')
/* eslint-enable no-unused-vars */

// Register custom MJML components
const { registerComponent } = require('mjml-core')
const MjSignoff = require('../mjml/MjSignoff.js').default
registerComponent(MjSignoff)
const { registerDependencies } = require('mjml-validator')
registerDependencies({
  'mj-signoff': [],
  'mj-body': ['mj-signoff'],
  'mj-wrapper': ['mj-signoff'],
})

//
// Create in-memory container for files as they are built
//
const built = {
  styles: {},
  content: {},
}

//
// Build CSS files from Sass source files.
//
function styles () {
  // Set styles source
  const sourceStyles = config.current.theme.path + '/**/*.scss'

  return pipeline(
    src(sourceStyles),

    // Build CSS
    sass({
      fiber: Fiber,
      outputStyle: 'compressed',
      importer: sassImporter({
        resolver: function (dir, url) {
          return url.startsWith('~/')
            ? path.resolve(dir, path.join(config.__lib, 'vars'), url.substr(2))
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
// Preprocess content
//
function content () {
  if (flags.debug) {
    notify.unjson(
      config.user.details.typography,
      'The following typographical enhancements will be performed:'
    )
  }

  // Set typography options based on configuration
  config.file.internal.details.typography.detergent.options.convertDashes =
    config.user.details.typography.convertDash
  config.file.internal.details.typography.detergent.options.convertApostrophes =
    config.user.details.typography.convertQuoteAndApostrophe
  config.file.internal.details.typography.detergent.options.convertDotsToEllipsis =
    config.user.details.typography.convertEllip
  config.file.internal.details.typography.typeset.options.hangingPunctuation =
    config.user.details.typography.hangPunctuation
  config.file.internal.details.typography.typeset.options.smallCaps =
    config.user.details.typography.enableSmallCaps
  config.file.internal.details.typography.typeset.css.enableSmallCaps =
    config.user.details.typography.enableSmallCaps
  config.file.internal.details.typography.typeset.css.hangingPunctuation =
    config.user.details.typography.hangPunctuation
  config.file.internal.details.typography.typeset.css.opticallyAlignLetters =
    config.user.details.typography.opticallyAlignLetters

  // Disable applicable Typeset options
  const typesetDisable = []
  Object.keys(config.file.internal.details.typography.typeset.options).forEach(
    key => {
      if (!config.file.internal.details.typography.typeset.options[key]) {
        typesetDisable.push(key)
      }
    }
  )

  return pipeline(
    src(config.current.templates.array),

    // Check for void/singleton elements in partials and warn
    tap(function (file) {
      const contents = file.contents.toString()
      const filename = path.basename(file.path)

      if (filename !== config.user.files.template) {
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
        config.file.internal.details.typography.detergent.options
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
        notify.msg('success', 'Content processing complete.')
      }
    }
  )
}

//
// Render email components
//
function render (cb) {
  // Default build options
  const htmlBuild = {
    file: 'index.html',
    options: config.file.internal.htmlBuild.options.dev,
  }
  const textBuild = {
    file: 'index.txt',
    status: false,
  }

  // Set production options
  if (flags.prod) {
    htmlBuild.options = config.file.internal.htmlBuild.options.prod
    notify.msg('info', config.file.internal.messages.productionBuild)
  }

  // Set template extension
  htmlBuild.options.fileExt = config.user.files.templateExt

  // Set text build options
  if (config.user.text.generate) {
    textBuild.status = true
    textBuild.options = config.file.internal.textBuild.options
    textBuild.options.baseElement = []
    textBuild.include = {
      images: {},
      partials: {},
    }

    // Load user-configurable CSS selectors to skip
    if (config.user.text.skipSelectors) {
      textBuild.options.selectors = []
      config.user.text.skipSelectors.forEach(element => {
        const obj = {
          selector: element,
          format: 'skip',
        }
        textBuild.options.selectors.push(obj)
      })
    }

    // Include image URIs if requested
    if (config.user.text.images) {
      textBuild.include.images = true
      delete textBuild.options.tags.img
    } else {
      textBuild.include.images = false
    }

    // Override default partial includes with user config, if set, and name
    // base elements
    Object.keys(config.user.text.include).forEach(key => {
      Object.assign(textBuild.include.partials, config.user.text.include)
      if (config.user.text.include[key] === true) {
        textBuild.options.baseElement.push('div.component-' + key)
      }
    })
  } else {
    notify.msg('info', config.file.internal.messages.plaintextOff)
  }

  // Warn if both Google Font and custom web font are enabled.
  if (
    config.theme.fonts.stack.google.enabled &&
    config.theme.fonts.stack.custom.enabled
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

    return pipeline(
      src(config.current.templates.main),

      // Process Handlebars data
      tap(function (file, t) {
        const contents = file.contents.toString()
        const format = Handlebars.compile(contents, {
          strict: true,
        })
        // Add in the Handlebars data (config) and helpers
        const processedTemplate = format(config, helpers)
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
      mjml(mjmlEngine, htmlBuild.options),
      tap(function (file) {
        notify.msg('debug', config.file.internal.messages.completeMJML)
      }),

      // Enforce proper image alt tags
      tap(function (file) {
        file.contents = Buffer.from(alts(file.contents.toString()))
      }),

      // Give production HTML a little extra minification (mostly around CSS)
      tap(function (file) {
        if (flags.prod) {
          const crushResult = crush(file.contents.toString())
          file.contents = Buffer.from(crushResult.result)
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
          notify.msg('success', 'Rendering complete.')
        }
      }
    )
  }
}

module.exports = {
  styles,
  content,
  render,
}
