'use strict';

const { watch, series } = require('gulp');

const { config }     = require('../functions/config.js');
const buildTemplates = require('./buildTemplates.js');

//
// Watch MJML source files and trigger build.
//

module.exports = function watchTemplates () {
  watch('./**/*' + config.files.mjml.ext, buildTemplates);
}
