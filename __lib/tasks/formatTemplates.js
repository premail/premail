'use strict';

const { src, dest } = require('gulp');
const prettier      = require('gulp-prettier');

const { userConfig } = require('../functions/userConfig.js');
const err            = require('../functions/err.js');
const { log }        = require('../vars/log.js');
const { msg }        = require('../vars/notifications.js');

//
// Format template files with Prettier.
//

module.exports = function formatTemplates() {
  return src('./**/*.' + userConfig.data.files.mjml.ext)
    .pipe(prettier({
        parser: "html"
      }))
    .on('error', err.handleError)
    .pipe(dest(file => file.base))
    .on('finish', function(source) {
      log(msg.info('All .' + userConfig.data.files.mjml.ext + ' templates reformatted.'));
    })
}
