'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const path = require('path')
const sass = require('gulp-sass')
const Fiber = require('fibers')
sass.compiler = require('sass')

const e = require('../functions/e.js')
const paths = require('../vars/paths.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Build CSS files from Sass source files.
//

module.exports = function buildStyles (done) {
  src(paths.theme.path + paths.theme.sassDir + '/**/*.scss')
    .pipe(
      sass({
        fiber: Fiber,
        outputStyle: 'compressed',
      }).on('error', e.sassError)
    )
    .pipe(dest(paths.theme.temp + paths.theme.sassDir))
    .on('end', function () {
      debug(
        msg.b('CSS files written to:\n') +
          paths.theme.temp +
          paths.theme.sassDir
      )
    })

  done()
}
