'use strict';

const { src, dest }  = require('gulp');
const fs             = require('fs');
const path           = require('path');
const gulpif         = require('gulp-if');
const rename         = require('gulp-rename');
const { htmlToText } = require('html-to-text');

const err        = require('../functions/err.js');
const paths      = require('../vars/paths.js');
const { log }    = require('../vars/log.js');
const { msg }    = require('../vars/notifications.js');
const { prod }   = require('../vars/prod.js');
const { debug }  = require('../vars/debug.js');

//
// Build a plain-text version of the HTML file.
//

module.exports = async function buildText() {

  let sourceFile;

  if (paths.email.name) {
    sourceFile = paths.email.dist + '/index.html';
  } else {
    sourceFile = paths.design.dist + '/index.html';
  }

  let destDir;

  if (paths.email.name) {
    destDir = paths.email.dist;
  } else {
    destDir = paths.design.dist;
  }

  if (debug) {
    log(debug(msg.b('Source:\n') + sourceFile));
  }

  let html = fs.readFileSync(sourceFile, {encoding: 'utf-8'});

  let text = htmlToText(html, {
    tables: true
  });

  console.log(text);

  // return src(fs.readFileSync(sourceFile, {encoding: 'utf-8'}))
  // .pipe(html2txt({tables: true}))
  // .on('error', err.handleError)
  // .pipe(
  //   rename(function (path) {
  //     path.dirname += destDir;
  //   })
  //   )
  // .pipe(dest('.'))
  // .on('finish', function(source) {
  //   log(msg.info(msg.b('Generated Text:\n') + paths.design.dist + '/index.txt'));
  // })
}
