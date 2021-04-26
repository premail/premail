'use strict';

const { watch, series } = require('gulp');

const { mainConfig } = require('../functions/mainConfig.js');
const { text }   = require('../vars/text.js');
const buildText  = require('./buildText.js');

//
// Watch HTML file and trigger build of plain-text version.
//

module.exports = function watchText () {
  if (text) {
    watch('./**/*.html', buildText);
  }
}
