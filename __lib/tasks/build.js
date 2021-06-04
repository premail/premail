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
const { removeWidows } = require('string-remove-widows')
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

// Create in-memory container for rendered files
const rendered = {}
rendered.styles = {}
rendered.partials = {}

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

    // Render CSS
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

    // Save rendered CSS to memory
    tap(function (file) {
      rendered.styles[path.basename(file.path)] = file.contents.toString()
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
// Render templates through Handlebars into email-ready HTML.
//
function email (cb) {
  // Check to make sure template file exists
  if (!fs.existsSync(config.current.templates.main)) {
    notify.msg('error', config.file.internal.messages.templateMissing)
    cb()
  } else {
    // @TODO: Load config.current.templates.all without confusing MJML.
    let stream = src(config.current.templates.main)
      // Load partials into memory
      .pipe(
        tap(function (file) {
          const ext = path.extname(file.path)
          if (ext === '.mjml') {
            rendered.partials[
              path.basename(file.path)
            ] = file.contents.toString()
          }
        })
      )

    // Process Handlebars data
    stream = stream
      .pipe(
        hb() // For details on build, insert { debug: true }
          .partials({
            // Rendered files
            ...rendered.styles,
            // ...rendered.partials,
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

    // Render MJML into HTML
    if (flags.prod) {
      stream = stream
        .pipe(
          mjml(mjmlEngine, {
            validationLevel: 'strict',
            fileExt: config.user.files.templateExt,
            beautify: false,
            minify: true,
            keepComments: false,
          })
        )
        .on('error', e.mjmlError)
        .on('end', function (source) {
          notify.msg('debug', config.file.internal.messages.completeMJML)
        })
    } else {
      stream = stream
        .pipe(
          mjml(mjmlEngine, {
            validationLevel: 'strict',
            fileExt: config.user.files.templateExt,
            beautify: true,
          })
        )
        .on('error', e.mjmlError)
        .on('end', function (source) {
          notify.msg('debug', config.file.internal.messages.completeMJML)
        })
    }

    // Apply typographical enhancements
    if (config.user.details.improveTypography) {
      const typesetOpts = {
        disable: config.file.internal.details.disableTypeEnhance,
      }
      const typesetGo = transform(function (filename) {
        return map(function (chunk, next) {
          return next(null, typeset(chunk, typesetOpts))
        })
      })
      const removeWidowsOpts = config.file.internal.details.removeWidowOpts
      const removeWidowsGo = tap(function (file) {
        const removeWidowsResult = removeWidows(
          file.contents.toString(),
          removeWidowsOpts
        )
        file.contents = Buffer.from(removeWidowsResult.res)
      })

      stream = stream.pipe(typesetGo).pipe(removeWidowsGo)

      notify.msg('debug', config.file.internal.messages.completeTypography)
    }

    // Write HTML version
    stream = stream
      .pipe(dest(path.dirname(destHTML)))
      .on('end', function (source) {
        notify.msg('info', destHTML, 'HTML file saved:')
        if (flags.prod) {
          notify.msg('warn', config.file.internal.messages.productionBuild)
        }
      })

    return stream
  }
}

//
// Render optional plain-text version.
//
function text (cb) {
  const textBuild = {
    status: false,
  }

  if (config.user.text.generate) {
    // Plain-text options
    textBuild.status = true
    textBuild.options = {
      baseElement: [],
      selectors: [{ selector: 'div.mj-menu-trigger', format: 'skip' }],
      tables: true,
      tags: {
        img: {},
      },
    }

    // Check to make sure HTML version exists
    if (!fs.existsSync(destHTML)) {
      notify.msg(
        'error',
        'Plain-text version requires HTML version to be created first.'
      )
      cb()
    } else {
      let stream = src(destHTML)

      // Determine which elements to include in plain text
      textBuild.include = {
        images: config.user.text.images,
        partials: {
          topNav: config.user.text.include.topNav,
          banner: config.user.text.include.banner,
          salutation: config.user.text.include.salutation,
          body: true,
          signoff: config.user.text.include.signoff,
          social: config.user.text.include.social,
          bottomNav: config.user.text.include.bottomNav,
          footer: config.user.text.include.footer,
        },
      }

      if (!textBuild.include.images) {
        textBuild.options.tags.img.format = 'skip'
      }

      Object.keys(textBuild.include.partials).forEach(key => {
        if (textBuild.include.partials[key]) {
          textBuild.options.baseElement.push('div.component-' + key)
        }
      })

      // Plain-text conversion
      stream = stream
        .pipe(
          tap(function (file) {
            file.contents = Buffer.from(
              htmlToText(file.contents.toString(), textBuild.options)
            )
          })
        )
        .on('error', e.textError)
        .on('finish', function (source) {
          if (flags.debug) {
            notify.unjson(
              textBuild.include,
              'Plain-text version built. Options configured:'
            )
          }
        })

        // Write plain-text file
        .pipe(rename(fileText))
        .pipe(dest(path.dirname(destText)))
        .on('end', function (source) {
          notify.msg('info', destText, 'Plain-text version saved:')
        })

      return stream
    }
  } else {
    notify.msg('info', config.file.internal.messages.plaintextOff)
    cb()
  }
}

module.exports = {
  styles,
  email,
  text,
}
