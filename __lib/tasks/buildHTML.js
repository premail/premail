'use strict';

const { src, dest } = require('gulp');
const path          = require('path');
const gulpif        = require('gulp-if');
const rename        = require('gulp-rename');
const mjml          = require('gulp-mjml');
const mjmlEngine    = require('mjml');

const { config } = require('../functions/config.js');
const err        = require('../functions/err.js');
const paths      = require('../vars/paths.js');
const { log }    = require('../vars/log.js');
const { msg }    = require('../vars/notifications.js');
const { prod }   = require('../vars/prod.js');
const { debug }  = require('../vars/debug.js');

//
// Build HTML files from MJML source files.
//

module.exports = function buildHTML() {

  let sourceFile;

  if (paths.email.name) {
    sourceFile = paths.email.path + '/index.' + config.files.mjml.ext;
  } else {
    sourceFile = paths.design.path + '/index.' + config.files.mjml.ext;
  }

  let destDir;

  if (paths.email.name) {
    destDir = path.resolve('/', config.paths.email.dir, paths.email.name, config.paths.output.dir);
  } else {
    destDir = path.resolve('/', config.paths.design.dir, paths.design.name, config.paths.output.dir);
  }

  let destFile = path.resolve(__dirname, destDir, 'index.html');

  return src(sourceFile)
  .pipe(gulpif(prod,
    // Production
    mjml(mjmlEngine, {
      fileExt: config.files.mjml.ext,
      beautify: false,
      minify: true,
      keepComments: false,
    }),
    // Development
    mjml(mjmlEngine, {
      fileExt: config.files.mjml.ext,
      beautify: true,
    })
  ))
  .on('finish', function(source) {
    log(debug(msg.b('Source:\n') + sourceFile));
  })
  .on('error', err.handleError)
  .pipe(
    rename(function (path) {
      path.dirname += destDir;
    })
    )
  .pipe(dest('.'))
  .on('finish', function(source) {
    log(msg.info(msg.b('Generated HTML:\n') + paths.design.dist + '/index.html'));
    if (prod) {
      log(msg.warn(msg.b('Production:') + ' Minified with HTML comments stripped.'));
    }
  })
}
