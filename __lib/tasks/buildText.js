'use strict';

const { src, dest }  = require('gulp');
const fs             = require('fs');
const path           = require('path');
const gulpif         = require('gulp-if');
const rename         = require('gulp-rename');
const { htmlToText } = require('html-to-text');

const err            = require('../functions/err.js');
const paths          = require('../vars/paths.js');
const { mainConfig } = require('../functions/mainConfig.js');
const { log }        = require('../vars/log.js');
const { msg }        = require('../vars/notifications.js');
const { prod }       = require('../vars/prod.js');
const { text }       = require('../vars/text.js');
const { debug }      = require('../vars/debug.js');

//
// Build a plain-text version of the HTML file.
//

module.exports = function buildText(done) {

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
      images: mainConfig.data.text.images,
      include: {
        topNav:     mainConfig.data.text.include.topNav,
        banner:     mainConfig.data.text.include.banner,
        salutation: mainConfig.data.text.include.salutation,
        body:       true,
        signoff:    mainConfig.data.text.include.signoff,
        social:     mainConfig.data.text.include.social,
        bottomNav:  mainConfig.data.text.include.bottomNav,
        footer:     mainConfig.data.text.include.footer
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

    fs.stat(sourceFile, function(err, stat) {
      if (err == null) {

        if (debug) {
          debug(msg.b('Plain-text source:\n') + sourceFile);
          debug(msg.b('\nPlain-text options configuration:\n') + JSON.stringify(configOpt, null, 2).replace(/[\"{},]/g, ''));
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

      } else if (err.code === 'ENOENT') {
        log(msg.error('Error building text version: index.html does not exist. Run `gulp buildHTML` before running this task.'));

      } else {
        log(msg.error('Error: ' + err.code));
      }

    });

  } else {
    log(msg.info('Plain-text generation turned off.'));
  }

  done();
}
