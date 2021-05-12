'use strict'

/* eslint-disable no-unused-vars */
const { watch, series } = require('gulp')

const { config } = require('../vars/config.js')
const e = require('../functions/e.js')
const buildHTML = require('../tasks/buildHTML.js')
/* eslint-enable no-unused-vars */

//
// Watch MJML source files and trigger build.
//

module.exports = function watchHTML () {
  watch('./**/*' + config.user.files.templateExt, buildHTML).on(
    'error',
    e.mjmlError
  )
}
