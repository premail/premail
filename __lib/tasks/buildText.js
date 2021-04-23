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
      tables: true,
      tags: {
        img: {}
      }
    }

    let configOpt = {
      images: config.data.text.images,
      include: {
        topNav:     config.data.text.include.topNav,
        banner:     config.data.text.include.banner,
        salutation: config.data.text.include.salutation,
        body:       true,
        signoff:    config.data.text.include.signoff,
        social:     config.data.text.include.social,
        bottomNav:  config.data.text.include.bottomNav,
        footer:     config.data.text.include.footer
      }
    };

    if(!configOpt.images) {
      buildOpt.tags.img.format = 'skip';
    }

    Object.keys(configOpt.include).forEach(key => {
      if(configOpt.include[key]) {
        buildOpt.baseElement.push('div.component-' + key);
      }
    });

    fs.exists(sourceFile, function (exists) {
      if (exists) {

        if (debug) {
          debug(msg.b('Plain-text source:\n') + sourceFile);
          debug(msg.b('\nPlain-text options configured:\n') + JSON.stringify(configOpt, null, 2).replace(/[\"{}]/g, ''));
        }

        let html = fs.readFileSync(sourceFile, {encoding: 'utf-8'});

        let text = htmlToText(
          // Remove hard-coded mobile navigation menu characters inserted by
          // MJML, which will otherwise show up in the generated plain-text.
          // Currently html-to-text does not give us a way to skip elements
          // based on selectors.
          //
          // @see:
          // https://github.com/html-to-text/node-html-to-text/issues/159
          html.replace(/&#9776;/g, '').replace(/&#8855;/g, ''),
          buildOpt
        );

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
