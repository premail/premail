'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const { pipeline } = require('stream')
const fs = require('fs')
const path = require('path')
const tap = require('gulp-tap')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sassImporter = require('node-sass-json-importer')
const Fiber = require('fibers')
sass.compiler = require('sass')
const hb = require('gulp-hb')
const helpers = require('handlebars-helpers')(['comparison'])
const mjml = require('gulp-mjml')
const mjmlEngine = require('mjml')
const typeset = require('typeset')
const { stripHtml } = require('string-strip-html')
const { removeWidows } = require('string-remove-widows')
const { alts } = require('html-img-alt')
const { crush } = require('html-crush')
const { det } = require('detergent')
const transform = require('vinyl-transform')
const map = require('map-stream')
const { htmlToText } = require('html-to-text')

const e = require('../functions/e.js')
const { config } = require('../vars/config.js')
const { flags } = require('../vars/flags.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Set up variables needed across the build.
//

// Create in-memory container for files as they are built
const built = {
  styles: {},
  partials: {},
  html: {},
  posthtml: {},
}

// Set destinations
const fileHTML = 'index.html'
const fileText = 'index.txt'
const destHTML = path.join(config.current.dist, fileHTML)
const destText = path.join(config.current.dist, fileText)

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
        notify.msg('info', 'Styles built.')
      }
    }
  )
}

//
// Prerender content partials
//
function prerender () {
  return pipeline(
    src(config.current.templates.array),

    tap(function (file) {
      // Load partials
      let partial = file.contents.toString()

      // Run detergent.io
      partial = det(partial, {
        removeLineBreaks: true,
        stripHtml: false,
      }).res

      // Save to object
      built.partials[path.basename(file.path)] = partial
    }),

    // Error handling
    err => {
      if (err) {
        e.e(err)
        process.exit(1)
      } else {
        notify.msg('debug', 'Prerendering content complete.')
      }
    }
  )
}

//
// Render MJML templates from Handlebars data
//
function render (cb) {
  // HTML build options
  const htmlBuild = {
    options: config.file.internal.htmlBuild.options,
  }

  if (flags.prod) {
    htmlBuild.options.beautify = false
    htmlBuild.options.minify = true
    htmlBuild.options.keepComments = false
  }

  // Check to make sure template file exists
  if (!fs.existsSync(config.current.templates.main)) {
    notify.msg('error', config.file.internal.messages.templateMissing)
    cb()
  } else {
    // @TODO: Rewrite using pipeline() instead of .pipe, as with the other
    // tasks. Main blocker on this right now is gulp-hb, which only works with
    // .pipe -- thus Handlebars would need to be implemented directly, e.g.
    // manually registering partials and using gulp-tap to process files.
    let stream = src(config.current.templates.main)

    // Process Handlebars data
    stream = stream
      .pipe(
        hb() // For details on build, insert { debug: true }
          .partials({
            // Anything used as a Handlebars include is a partial
            ...built.styles,
            ...built.partials,
          })
          .helpers(helpers) // Handlebars helpers from 'require' at top
          .data(config) // Data, which for Handlebars are config values
      )
      .on('error', e.hbError)
      .on('end', function () {
        // Warn if both Google Font and custom web font are enabled.
        if (
          config.theme.fonts.stack.google.enabled &&
          config.theme.fonts.stack.custom.enabled
        ) {
          notify.msg('warn', config.file.internal.messages.multipleWebFonts)
        }
        // Notify that Handlebars processing is complete.
        notify.msg('debug', config.file.internal.messages.completeHandlebars)
      })

    // Uncomment the next line to write the rendered template to disk.
    // stream = stream.pipe(dest(path.dirname(destHTML)))

    // Build HTML version
    stream = stream
      .pipe(mjml(mjmlEngine, htmlBuild.options))
      .on('error', e.mjmlError)
      .on('end', function (source) {
        notify.msg('debug', config.file.internal.messages.completeMJML)
      })

    // Give production output a little extra minification
    stream = stream.pipe(
      tap(function (file) {
        if (flags.prod) {
          const crushResult = crush(file.contents.toString(), {
            removeLineBreaks: true,
          })
          file.contents = Buffer.from(crushResult.result)
        }
      })
    )

    // Save to object
    stream = stream.pipe(
      tap(function (file) {
        built.html[path.basename(file.path)] = file.contents.toString('utf8')
      })
    )

    return stream
  }
}

//
// Postrender content (applies to HTML version only)
//
function postrender (cb) {
  // Typographical enhancement options
  const typographyOpts = {
    // Widow removal
    removeWidows: {
      status: config.user.details.typography.removeWidows,
      options: config.file.internal.details.removeWidowOpts,
    },
    // Configurable Typeset options
    typeset: {
      hyphenate: false,
      hangingPunctuation: config.user.details.typography.hangPunctuation,
      ligatures: false,
      punctuation: config.user.details.typography.improveDashAndEllip,
      quotes: config.user.details.typography.improveQuoteAndApostrophe,
      smallCaps: config.user.details.typography.enableSmallCaps,
    },
    // Typeset options requiring CSS styling
    typesetCSS: {
      opticallyAlignLetters:
        config.user.details.typography.opticallyAlignLetters,
      enableSmallCaps: config.user.details.typography.enableSmallCaps,
    },
    // Generate array of Typeset features to disable
    typesetDisable: [],
  }
  Object.keys(typographyOpts.typeset).forEach(key => {
    if (!typographyOpts.typeset[key]) {
      typographyOpts.typesetDisable.push(key)
    }
  })

  // Create object to display configured options
  typographyOpts.display = Object.assign(
    typographyOpts.typeset,
    typographyOpts.typesetCSS
  )
  typographyOpts.display.removeWidows = typographyOpts.removeWidows.status

  return pipeline(
    src(built.html),

    // Apply typographical enhancements
    transform(function (filename) {
      return map(function (chunk, next) {
        return next(
          null,
          typeset(chunk, { disable: typographyOpts.typesetDisable })
        )
      })
    }),

    // if (flags.debug) {
    //   notify.unjson(
    //     typographyOpts.display,
    //     'Typographical enhancements performed:'
    //   ),
    // }

    tap(function (file) {
      // Enforce proper image alt tags
      const enforceImageAltResult = alts(file.contents.toString())
      file.contents = Buffer.from(enforceImageAltResult)

      // Save to object
      built.posthtml[path.basename(file.path)] = file.contents.toString()
    }),

    // Error handling
    err => {
      if (err) {
        e.e(err)
        process.exit(1)
      } else {
        notify.msg('debug', 'Rendering HTML complete.')
      }
    }
  )
}

//
// Write HTML version
//
function html (cb) {
  return pipeline(
    src(built.html),
    dest(path.dirname(destHTML)),

    // Error handling
    err => {
      if (err) {
        e.e(err)
        process.exit(1)
      } else {
        notify.msg('debug', 'Writing HTML complete.')
      }
    }
  )
}

//
// Build optional plain-text version.
//
function text (cb) {
  const textBuild = {
    status: false,
  }

  if (config.user.text.generate) {
    // Plain-text build options
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

    return pipeline(
      // Build from rendered HTML, not postrendered HTML
      src(built.html),

      tap(function (file) {
        // Plain-text conversion
        file.contents = Buffer.from(
          htmlToText(file.contents.toString(), textBuild.options)
        )
      }),

      // Write plain-text file
      rename(fileText),
      dest(path.dirname(destText)),

      // Error handling
      err => {
        if (err) {
          e.e(err)
          process.exit(1)
        } else {
          notify.msg('debug', 'Writing plain-text complete.')
        }
      }
    )
  } else {
    notify.msg('info', config.file.internal.messages.plaintextOff)
    process.exit(1)
  }
}

module.exports = {
  prerender,
  styles,
  render,
  postrender,
  html,
  text,
}
