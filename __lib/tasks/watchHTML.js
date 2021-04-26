'use strict';

const { watch, series } = require('gulp');

const { mainConfig }     = require('../functions/mainConfig.js');
const buildHTML = require('./buildHTML.js');

//
// Watch MJML source files and trigger build.
//

module.exports = function watchHTML () {
  watch('./**/*' + mainConfig.data.files.mjml.ext, buildHTML);
}
