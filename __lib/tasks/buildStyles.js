'use strict';

const { src, dest } = require('gulp');
const path          = require('path');
const sass          = require('gulp-sass');
const tap           = require('gulp-tap');
const Fiber         = require('fibers');
sass.compiler       = require('sass');

const err       = require('../functions/err.js');
const paths     = require('../vars/paths.js');
const { log }   = require('../vars/log.js');
const { msg }   = require('../vars/notifications.js');
const { debug } = require('../vars/debug.js');

//
// Build CSS files from Sass source files.
//

module.exports = function buildStyles(done) {
  src(paths.theme.path + paths.theme.sassDir + '/**/*.scss')
    .pipe(sass({
      fiber: Fiber,
      outputStyle: 'compressed',
    })
    .on('error', err.sassError))
    .pipe(dest(paths.theme.path + paths.theme.sassDir))
    .pipe(
      tap(function (file,t) {
        debug(msg.b('CSS file written to:\n') + paths.theme.path + paths.theme.sassDir + '/' + path.basename(file.path));
      })
    )

  done();
}
