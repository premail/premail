'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const yaml = require('js-yaml')

const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
const { flags } = require('../vars/flags.js')
/* eslint-enable no-unused-vars */

//
// Display current configuration with debug
//

module.exports = function showConfig (done) {
  if (flags.debug) {
    // Uncomment the following line to include internal configuration
    // notify.unjson(config.file.internal, 'Internal configuration:')

    // User-defined configuration
    notify.unjson(config.user, 'Build configuration:')

    // Theme configuration
    notify.unjson(config.theme, 'Theme configuration:')

    done()
  } else {
    done()
  }
}
