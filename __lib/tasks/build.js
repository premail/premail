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
const Handlebars = require('handlebars')
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
  content: {},
}

// Set destinations
const fileHTML = 'index.html'
const destHTML = path.join(config.current.dist, fileHTML)

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
// Preprocess content
//
function content () {
  return pipeline(
    src(config.current.templates.array),

    tap(function (file) {
      // Load partials
      let content = file.contents.toString()

      // Run detergent.io
      content = det(content, {
        removeLineBreaks: true,
        stripHtml: false,
      }).res

      // Save to object
      built.content[path.basename(file.path)] = content
    }),

    // Error handling
    err => {
      if (err) {
        e.e(err)
        process.exit(1)
      } else {
        notify.msg('debug', 'Content processing complete.')
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
    // Register Handlebars partials (any include is a partial)
    const partials = { ...built.styles, ...built.content }
    for (const key in partials) {
      Handlebars.registerPartial(`${key}`, partials[key])
    }

    return pipeline(
      src(config.current.templates.main),

      tap(function (file, t) {
        const contents = file.contents.toString()
        const format = Handlebars.compile(contents, {
          strict: true,
        })
        // Add in the Handlebars data (config)
        const processedTemplate = format(config)
        file.contents = Buffer.from(processedTemplate, 'utf-8')
      }),

      dest(path.dirname(destHTML)),

      // Error handling
      err => {
        if (err) {
          e.e(err)
          process.exit(1)
        } else {
          notify.msg('debug', 'Rendering complete.')
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
