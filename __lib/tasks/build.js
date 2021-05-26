'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
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

// Create object to hold rendered CSS
const styleObj = {}

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

      // Save CSS styles as an object we'll use as Handlebars partials
      .pipe(
        tap(function (file) {
          styleObj[path.basename(file.path)] = file.contents.toString()
        })
      )
  )
}

//
// Render templates through Handlebars into email-ready HTML and plain-text.
//
function email () {
  // Process Handlebars data
  let stream = src(config.current.templates.main)
    .pipe(
      hb() // For details on build, insert { debug: true }
        .partials(styleObj) // CSS styles from the styles() function
        .helpers(helpers) // Handlebars helpers from 'require' at the top
        .data(config) // Data source
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
    const enhanceOpts = {
      disable: config.file.internal.details.disableTypeEnhance,
    }
    const enhance = transform(function (filename) {
      return map(function (chunk, next) {
        return next(null, typeset(chunk, enhanceOpts))
      })
    })
    stream = stream.pipe(enhance)
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
          notify.json(
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

module.exports = {
  styles,
  email,
}
