'use strict'

/* eslint-disable no-unused-vars */
const { watch, series } = require('gulp')

const paths = require('../vars/paths.js')
const buildStyles = require('../tasks/buildStyles.js')
/* eslint-enable no-unused-vars */

//
// Watch Sass source files and trigger build.
//

module.exports = function watchStyles () {
  watch(paths.sassDir + '**/*.scss', series('buildStyles'))
}
