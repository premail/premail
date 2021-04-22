'use strict';

const { watch, series } = require('gulp');

const { config }     = require('../functions/config.js');
const buildText = require('./buildText.js');

//
// Watch HTML file and trigger build of plain-text version.
//

module.exports = function watchText () {
  watch('./**/*.html', buildText);
}
