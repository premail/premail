'use strict';

const { watch, series } = require('gulp');

const paths     = require('../vars/paths.js');
const buildStyles = require('./buildStyles.js');

//
// Watch Sass source files and trigger build.
//

module.exports = function watchStyles() {
  watch(paths.sassDir + '**/*.scss', series('buildStyles'));
}
