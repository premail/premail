'use strict'

/* eslint-disable no-unused-vars */
const { watch, series } = require('gulp')

const { config } = require('../vars/config.js')
const e = require('../functions/e.js')
const buildStyles = require('../tasks/buildStyles.js')
/* eslint-enable no-unused-vars */

//
// Watch Sass source files and trigger build.
//
module.exports = function watchStyles () {
  watch(
    config.current.theme.path + config.current.theme.sassDir + '/**/*.scss',
    series('buildStyles')
  ).on('error', e.sassError)
}
