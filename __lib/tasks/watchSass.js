'use strict';

const { watch, series } = require('gulp');

const paths     = require('../vars/paths.js');
const buildSass = require('./buildSass.js');

//
// Watch Sass source files and trigger build.
//

module.exports = function watchSass() {
  watch(paths.sassDir + '**/*.scss', series('buildSass'));
}
