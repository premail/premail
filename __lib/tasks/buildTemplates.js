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
const notify = require('../vars/notify.js')
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
        notify.debug('Templates rendered.')
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

      // Set destination and write files
      .pipe(
        rename(function (path, file) {
          const subPath = file.path
            .replace(config.current.path, '')
            .replace(path.basename, '')
            .replace(path.extname, '')
          path.dirname += subPath
          notify.debug(
            'Processed template file: ' + path.basename + path.extname
          )
        })
      )
      .pipe(dest(config.current.temp))
      .on('end', function () {
        notify.debug(
          config.current.temp,
          'Created temporary template files at:'
        )
      })
  )
}
