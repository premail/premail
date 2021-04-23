'use strict';

const { src, dest }  = require('gulp');
const fs             = require('fs');
const path           = require('path');
const gulpif         = require('gulp-if');
const rename         = require('gulp-rename');
const { htmlToText } = require('html-to-text');

const err        = require('../functions/err.js');
const paths      = require('../vars/paths.js');
const { config } = require('../functions/config.js');
const { log }    = require('../vars/log.js');
const { msg }    = require('../vars/notifications.js');
const { prod }   = require('../vars/prod.js');
const { text }   = require('../vars/text.js');
const { debug }  = require('../vars/debug.js');

//
// Build a plain-text version of the HTML file.
//

module.exports = async function buildText() {

  if (text) {

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

    let buildOpt = {
      baseElement: [],
      tables: true
    }

    let configOpt = {
      include: {
        topNav:     config.text.include.topNav,
        banner:     config.text.include.banner,
        salutation: config.text.include.salutation,
        body:       true,
        signoff:    config.text.include.signoff,
        social:     config.text.include.social,
        bottomNav:  config.text.include.bottomNav,
        footer:     config.text.include.footer
      }
    };

    Object.keys(configOpt.include).forEach(key => {
      if(configOpt.include[key]) {
        buildOpt.baseElement.push('div.component-' + key);
      }
    });

    fs.exists(sourceFile, function (exists) {
      if (exists) {

        if (debug) {
          log(debug(msg.b('Plain-text source:\n') + sourceFile));
          log(debug(msg.b('\nPlain-text options configured:\n') + JSON.stringify(configOpt, null, 2).replace(/[\"{}]/g, '')));
        }

        let html = fs.readFileSync(sourceFile, {encoding: 'utf-8'});

        let text = htmlToText(html, buildOpt);

        fs.writeFileSync(destFile, text);

        log(msg.info(msg.b('Plain-text version saved:\n') + destFile));

      } else {
        log(msg.error('Error building text version: index.html does not exist. Run `gulp buildHTML` first to generate index.html.'));
      }

    });

  } else {
    log(msg.info('Plain-text generation turned off.'));
  }

}
