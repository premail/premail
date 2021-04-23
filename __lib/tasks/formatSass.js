'use strict';

const { src, dest } = require('gulp');
const prettier      = require('gulp-prettier');

const paths   = require('../vars/paths.js');
const err     = require('../functions/err.js');
const { log } = require('../vars/log.js');
const { msg } = require('../vars/notifications.js');

//
// Format Sass files with Prettier.
//

module.exports = function formatSass() {
  return src(paths.sassDir + '**/*.scss')
    .pipe(
      prettier({
        parser: "scss"
      })
    )
    .on('error', err.handleError)
    .pipe(dest(file => file.base))
    .on('finish', function(source) {
      log(msg.info('Reformatted Sass files.'));
    })
}