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
    sourceFile = paths.email.path + paths.email.file;
  } else {
    sourceFile = paths.design.path + paths.design.file;
  }

  let destDir;

  if (paths.email.name) {
    destDir = paths.email.dist;
  } else {
    destDir = paths.design.dist;
  }

  let destFile = destDir + '/index.html';

  return src(sourceFile)
  .pipe(gulpif(prod,
    // Production
    mjml(mjmlEngine, {
      fileExt: config.data.files.mjml.ext,
      beautify: false,
      minify: true,
      keepComments: false,
    }),
    // Development
    mjml(mjmlEngine, {
      fileExt: config.data.files.mjml.ext,
      beautify: true,
    })
  ))
  .on('finish', function(source) {
    log(debug(msg.b('HTML source:\n') + sourceFile));
  })
  .on('error', err.handleError)
  .pipe(dest(destDir))
  .on('finish', function(source) {
    log(msg.info(msg.b('HTML version saved:\n') + destFile));
    if (prod) {
      log(msg.warn(msg.b('Production:') + ' Minified with HTML comments stripped.'));
    }
  })
}
