'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const rename = require('gulp-rename')
const path = require('path')
const hb = require('gulp-hb')
const helpers = require('handlebars-helpers')(['comparison'])
const fileinclude = require('gulp-file-include')

const e = require('../functions/e.js')
const { config } = require('../vars/config.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Render Handlebars templates into HTML/MJML.
//

module.exports = function buildTemplates () {
  // Load templates
  const templates = []
  for (const template of config.current.templates.array) {
    templates.push(template)
  }

  // Render templates
  return (
    src(templates)
      // Process Handlebars data
      .pipe(
        hb()
          .partials()
          .helpers(helpers)
          .data(config)
      )
      .on('error', e.hbError)
      .on('end', function () {
        debug('Templates rendered.')
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
        debug('Template file includes processed.')
      })

      // Set destination and write files
      .pipe(
        rename(function (path, file) {
          const subPath = file.path
            .replace(config.current.path, '')
            .replace(path.basename, '')
            .replace(path.extname, '')
          path.dirname += subPath
          debug('Processed template file: ' + path.basename + path.extname)
        })
      )
      .pipe(dest(config.current.temp))
      .on('end', function () {
        debug(
          msg.b('Created temporary template files at: ') + config.current.temp
        )
      })
  )
}
