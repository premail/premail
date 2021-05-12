'use strict'

/* eslint-disable no-unused-vars */
const { watch, series } = require('gulp')

const { config } = require('../vars/config.js')
const e = require('../functions/e.js')
const buildText = require('../tasks/buildText.js')
/* eslint-enable no-unused-vars */

//
// Watch HTML file and trigger build of plain-text version.
//

module.exports = function watchText () {
  if (config.user.text.generate) {
    watch('./**/*.html', buildText).on('error', e.textError)
  }
}
