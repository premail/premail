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

  let destFile = destDir + '/index.txt';

  fs.exists(sourceFile, function (exists) {
    if (exists) {

      if (debug) {
        log(debug(msg.b('Plain-text source:\n') + sourceFile));
      }

      let html = fs.readFileSync(sourceFile, {encoding: 'utf-8'});

      let text = htmlToText(html, {
        tables: true
      });

      fs.writeFileSync(destFile, text);

      log(msg.info(msg.b('Plain text version saved:\n') + destFile));

    } else {
      log(msg.error('Error: index.html does not exist. Run `gulp buildHTML` first to generate index.html.'));
    }

  });

}
