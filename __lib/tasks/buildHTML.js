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
const { flags } = require('../vars/flags.js')
const notify = require('../vars/notify.js')
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
        notify.debug(sourceFile, 'HTML source:')
      })

      // Write file
      .pipe(dest(path.dirname(destFile)))
      .on('end', function (source) {
        notify.info(destFile, 'HTML file saved:')
        if (flags.prod) {
          notify.warn('Minified with HTML comments stripped', 'Production:')
        }
      })
  )
}
