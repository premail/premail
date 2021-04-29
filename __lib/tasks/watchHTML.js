'use strict'

/* eslint-disable no-unused-vars */
const { watch, series } = require('gulp')

const { userConfig } = require('../functions/userConfig.js')
const buildHTML = require('../tasks/buildHTML.js')
/* eslint-enable no-unused-vars */

//
// Watch MJML source files and trigger build.
//

module.exports = function watchHTML () {
  watch('./**/*' + userConfig.data.files.templateExt, buildHTML)
}
