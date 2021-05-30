'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const fs = require('fs')
const path = require('path')
const mergeStream = require('merge-stream')
const tap = require('gulp-tap')
const replace = require('gulp-replace')
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
const html2txt = require('gulp-html2txt')

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
const destHTML = path.join(config.current.dist, 'index.html')
const destText = path.join(config.current.dist, 'index.txt')

//
// Build CSS files from Sass source files.
//

function styles () {
  // Set styles source
  const sourceStyles = config.current.theme.path + '/**/*.scss'

  return (
    src(sourceStyles)
      // Render CSS
      .pipe(
        sass({
          fiber: Fiber,
          outputStyle: 'compressed',
          importer: sassImporter({
            resolver: function (dir, url) {
              return url.startsWith('~/')
                ? path.resolve(
                    dir,
                    path.join(config.__lib, 'vars'),
                    url.substr(2)
                  )
                : path.resolve(dir, url)
            },
          }),
        }).on('error', e.sassError)
      )

      // Save rendered CSS to memory
      .pipe(
        tap(function (file) {
          rendered.styles[path.basename(file.path)] = file.contents.toString()
        })
      )
  )
}

//
// Render templates through Handlebars into email-ready HTML and plain-text.
//
function email (cb) {
  // Check to make sure template file exists
  if (!fs.existsSync(config.current.templates.main)) {
    notify.error(
      'Check the filename specified in your `config.yaml` file.',
      'Main template file cannot be found'
    )
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
          notify.warn(
            'You have enabled both a Google web font and a custom web font. MJML will only render the first provided web font.',
            'Multiple web fonts enabled:'
          )
        }
        notify.debug('Handlebars processing complete')
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
          notify.debug('MJML processing complete')
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
          notify.debug('MJML processing complete')
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

      notify.debug('Typographical enhancements performed with Typeset')
    }

    // Write HTML version
    stream = stream
      .pipe(dest(path.dirname(destHTML)))
      .on('end', function (source) {
        notify.info(destHTML, 'HTML file saved:')
        if (flags.prod) {
          notify.warn('Minified with HTML comments stripped', 'Production:')
        }
      })

    // Options for rendering text
    const textBuild = {
      status: false,
    }
    if (config.user.text.generate) {
      textBuild.status = true
      textBuild.options = {
        baseElement: [],
        tables: true,
        tags: {
          img: {},
        },
      }

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
    }

    // Write plain-text version
    if (textBuild.status) {
      stream = stream
        .pipe(html2txt(textBuild.options))
        .on('error', e.textError)
        .on('end', function (source) {
          if (flags.debug) {
            notify.unjson(
              textBuild.include,
              'Plain-text version built. Options configured:'
            )
          }
        })
        // Remove hard-coded mobile navigation menu characters inserted by
        // MJML, which will otherwise show up in the generated plain-text.
        // Currently html-to-text does not give us a way to skip elements
        // based on selectors.
        //
        // @see:
        // https://github.com/html-to-text/node-html-to-text/issues/159
        .pipe(replace('☰ ⊗\n', ''))
        .pipe(dest(path.dirname(destText)))
        .on('end', function (source) {
          notify.info(destText, 'Plain-text version saved:')
        })
    } else {
      notify.info('Plain-text generation turned off.')
    }

    return stream
  }
}

module.exports = {
  styles,
  email,
}
