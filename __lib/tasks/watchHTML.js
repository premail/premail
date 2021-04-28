'use strict'

const { watch, series } = require('gulp')

const { userConfig } = require('../functions/userConfig.js')
const buildHTML = require('../tasks/buildHTML.js')

//
// Watch MJML source files and trigger build.
//

module.exports = function watchHTML () {
  watch('./**/*' + userConfig.data.files.mjml.ext, buildHTML)
}
