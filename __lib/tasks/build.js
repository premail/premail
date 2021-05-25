'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const path = require('path')
const mergeStream = require('merge-stream')
const lazypipe = require('lazypipe')
const tap = require('gulp-tap')
const gulpif = require('gulp-if')
const replace = require('gulp-replace')
const sass = require('gulp-sass')
const sassImporter = require('node-sass-json-importer')
sass.compiler = require('sass')
const hb = require('gulp-hb')
const helpers = require('handlebars-helpers')(['comparison'])
const fileinclude = require('gulp-file-include')
// const rename = require('gulp-rename')
const mjml = require('gulp-mjml')
const mjmlEngine = require('mjml')
const html2txt = require('gulp-html2txt')

const e = require('../functions/e.js')
const { config } = require('../vars/config.js')
const { flags } = require('../vars/flags.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Set up necessary variables
//

// Set templates source
const templates = []
for (const template of config.current.templates.array) {
  templates.push(template)
}

// Set styles source
const sourceStyles =
  config.current.theme.path + config.current.theme.sassDir + '/**/*.scss'

// Set destinations
const destHTML = path.join(config.current.dist, 'index.html')
const destText = path.join(config.current.dist, 'index.txt')

//
// Set up plain-text options and lazypipe function to use later on in the build
// with gulp-if()
//

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

  // Determine which elements to include
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

// Render plain-text version
const buildPlainText = lazypipe()
  .pipe(html2txt, textBuild.options)
  // .on('error', e.textError)
  // .on('end', function (source) {
  //   notify.debug(JSON.stringify(textIncludeOpt, null, 2)
  //     .replace(/["{},]/g, ''),'Plain-text version built. Options configured:')
  // })

  // Remove hard-coded mobile navigation menu characters inserted by MJML, which
  // will otherwise show up in the generated plain-text. Currently html-to-text
  // does not give us a way to skip elements based on selectors.
  //
  // @see:
  // https://github.com/html-to-text/node-html-to-text/issues/159
  .pipe(replace, '☰ ⊗\n', '')

  // Write file
  .pipe(dest, path.dirname(destText))
// .on('end', function (source) {
//   notify.info(destText, 'Plain-text version saved:')
// })

//
// Build CSS files from Sass source files.
//
function styles () {
  return (
    src(sourceStyles)
      // Render CSS
      .pipe(
        sass({
          outputStyle: 'compressed',
          // includePaths: config.current.theme.temp,
          importer: sassImporter(),
        }).on('error', e.sassError)
      )

      // Save file contents to memory
      // .pipe(tap(function(file) {
      //   memory.styles[path.basename(file.path)] = file.contents.toString()
      // }))
      // .on('end', function() {
      //   notify.debug(JSON.stringify(memory.styles, null, 2))
      // })

      // Write files
      .pipe(dest(config.current.theme.temp + config.current.theme.sassDir))
      .on('end', function () {
        notify.debug(
          config.current.theme.temp + config.current.theme.sassDir,
          'CSS files written to:'
        )
      })
  )
}

//
// Render templates through Handlebars into email-ready HTML and plain-text
//
function email () {
  return (
    src(config.current.templates.main)
      // Process Handlebars data
      .pipe(
        hb()
          .partials(config.current.templates.partials)
          .helpers(helpers)
          .data(config)
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

      // Process file includes
      .pipe(
        fileinclude({
          prefix: '@@',
          basepath: path.join(
            config.current.theme.temp,
            config.current.theme.sassDir
          ),
        })
      )
      .on('error', e.includeError)
      .on('end', function () {
        notify.debug('Template file includes processed.')
      })

      // Render MJML into HTML
      .pipe(
        gulpif(
          flags.prod,
          // Production
          mjml(mjmlEngine, {
            validationLevel: 'strict',
            fileExt: config.user.files.templateExt,
            beautify: false,
            minify: true,
            keepComments: false,
          }),
          // Development
          mjml(mjmlEngine, {
            validationLevel: 'strict',
            fileExt: config.user.files.templateExt,
            beautify: true,
          })
        )
      )
      .on('error', e.mjmlError)
      .on('end', function (source) {
        notify.debug('MJML processing complete')
      })

      // Write HTML version
      .pipe(dest(path.dirname(destHTML)))
      .on('end', function (source) {
        notify.info(destHTML, 'HTML file saved:')
        if (flags.prod) {
          notify.warn('Minified with HTML comments stripped', 'Production:')
        }
      })

      // Write plain-text version
      .pipe(gulpif(textBuild.status, buildPlainText()))
  )
}

module.exports = {
  styles,
  email,
}
