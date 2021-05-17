'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const path = require('path')
const del = require('del')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')
const mjml = require('gulp-mjml')
const mjmlEngine = require('mjml')

const e = require('../functions/e.js')
const { config } = require('../vars/config.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { prod } = require('../vars/prod.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Build HTML files from MJML source files.
//

module.exports = function buildHTML () {
  // Set source and destination
  const sourceFile = path.join(config.current.temp, config.current.mainTemplate)
  const destFile = path.join(config.current.dist, 'index.html')

  // Render HTML
  return (
    src(sourceFile)
      .pipe(
        gulpif(
          prod,
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
        debug(msg.b('HTML source:\n') + sourceFile)
      })

      // Write file
      .pipe(dest(path.dirname(destFile)))
      .on('end', function (source) {
        log(msg.info(msg.b('HTML file saved:\n') + destFile))
        if (prod) {
          log(
            msg.warn(
              msg.b('Production:') + ' Minified with HTML comments stripped.'
            )
          )
        }
      })
  )
}
