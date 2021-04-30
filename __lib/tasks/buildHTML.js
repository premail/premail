'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const fs = require('fs')
const path = require('path')
const del = require('del')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')
const mjml = require('gulp-mjml')
const mjmlEngine = require('mjml')

const { userConfig } = require('../functions/userConfig.js')
const error = require('../functions/err.js')
const paths = require('../vars/paths.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { prod } = require('../vars/prod.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Build HTML files from MJML source files.
//

module.exports = function buildHTML (done) {
  const sourceFile = path.join(paths.current.temp, paths.current.mainTemplate)
  const destFile = path.join(paths.current.dist, 'index.html')

  fs.stat(sourceFile, function (err, stat) {
    if (err == null) {
      src(sourceFile)
        .pipe(
          gulpif(
            prod,
            // Production
            mjml(mjmlEngine, {
              validationLevel: 'strict',
              fileExt: userConfig.data.files.templateExt,
              beautify: false,
              minify: true,
              keepComments: false,
            }),
            // Development
            mjml(mjmlEngine, {
              validationLevel: 'strict',
              fileExt: userConfig.data.files.templateExt,
              beautify: true,
            })
          )
        )
        .on('error', error.handleError)
        .on('finish', function (source) {
          debug(msg.b('HTML source:\n') + sourceFile)
        })
        .pipe(dest(path.dirname(destFile)))
        .on('finish', function (source) {
          log(msg.info(msg.b('HTML version saved:\n') + destFile))
          if (prod) {
            log(
              msg.warn(
                msg.b('Production:') + ' Minified with HTML comments stripped.'
              )
            )
          }
        })
    } else if (err.code === 'ENOENT') {
      log(
        msg.error(
          'Error building HTML files: Main template file does not exist. Run `gulp buildTemplates` before running this task.'
        )
      )
    } else {
      log(msg.error('Error: ' + err.code))
    }
  })

  done()
}
