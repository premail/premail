'use strict';

const { watch, series } = require('gulp');

const { config }     = require('../functions/config.js');
const buildHTML = require('./buildHTML.js');

//
// Watch MJML source files and trigger build.
//

module.exports = function watchHTML () {
  watch('./**/*' + config.files.mjml.ext, buildHTML);
}
