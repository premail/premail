'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const { pipeline } = require('stream')
const fs = require('fs')
const path = require('path')
const gulpif = require('gulp-if')
const tap = require('gulp-tap')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sassImporter = require('node-sass-json-importer')
const Fiber = require('fibers')
sass.compiler = require('sass')
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
/* eslint-enable no-unused-vars */

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
      built.styles[path.basename(file.path)] = file.contents.toString()
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
  // Set typographical options
  const typographyOpts = {
    // Detergent.io
    detergent: {
      removeLineBreaks: true,
      stripHtml: false,
      removeWidows: false, // Introduces issues with CSS code
      convertDashes: config.user.details.typography.convertDash,
      convertApostrophes:
        config.user.details.typography.convertQuoteAndApostrophe,
      convertDotsToEllipsis: config.user.details.typography.convertEllip,
    },
    // Configurable Typeset options
    typeset: {
      hyphenate: false, // Generates too many edge cases
      ligatures: false, // Unreliable
      punctuation: false, // Handled by Detergent
      quotes: false, // Handled by Detergent
      spaces: false, // Unnecessary
      hangingPunctuation: config.user.details.typography.hangPunctuation,
      smallCaps: config.user.details.typography.enableSmallCaps,
    },
    // Typeset options requiring CSS styling
    typesetCSS: {
      enableSmallCaps: config.user.details.typography.enableSmallCaps,
      hangingPunctuation: config.user.details.typography.hangPunctuation,
      opticallyAlignLetters:
        config.user.details.typography.opticallyAlignLetters,
    },
    // Generate array of Typeset features to disable
    typesetDisable: [],
  }
  Object.keys(typographyOpts.typeset).forEach(key => {
    if (!typographyOpts.typeset[key]) {
      typographyOpts.typesetDisable.push(key)
    }
  })

  if (flags.debug) {
    notify.unjson(
      config.user.details.typography,
      'The following typographical enhancements will be performed:'
    )
  }

  return pipeline(
    src(config.current.templates.array),

    // Typographic enhancements: Detergent
    tap(function (file) {
      const results = det(file.contents.toString(), typographyOpts.detergent)
      file.contents = Buffer.from(results.res)
    }),

    // Typographic enhancements: Typeset
    tap(function (file) {
      transform(function (filename) {
        return map(function (chunk, next) {
          return next(
            null,
            typeset(chunk, { disable: typographyOpts.typesetDisable })
          )
        })
      })
    }),

    // Save built content to memory
    tap(function (file) {
      built.content[path.basename(file.path)] = file.contents.toString()
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
    options: config.file.internal.htmlBuild.options,
  }
  const textBuild = {
    file: 'index.txt',
    status: false,
  }

  // Set production options
  if (flags.prod) {
    htmlBuild.options.beautify = false
    htmlBuild.options.minify = true
    htmlBuild.options.keepComments = false
    notify.msg('info', config.file.internal.messages.productionBuild)
  }

  // Set text build options
  if (config.user.text.generate) {
    textBuild.status = true
    textBuild.options = config.file.internal.textBuild.options
    textBuild.options.baseElement = []
    textBuild.include = {
      images: {},
      partials: {},
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

  // Check to make sure template file exists
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
        // Add in the Handlebars data (config)
        const processedTemplate = format(config)
        file.contents = Buffer.from(processedTemplate, 'utf-8')
      }),

      // Uncomment the next line to write the rendered template to disk.
      // dest(config.current.dist),

      // Compile MJML into HTML
      mjml(mjmlEngine, htmlBuild.options),

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
