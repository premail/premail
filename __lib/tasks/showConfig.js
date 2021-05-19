'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const yaml = require('js-yaml')

const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Display current configuration with debug
//

module.exports = function showConfig (done) {
  // Uncomment the following line to include internal configuration
  // notify.debug(
  //   JSON.stringify(config.internal, null, 2).replace(/[\"{},]/g, ''),
  //   'Internal configuration:'
  // )

  // User-defined configuration
  notify.debug(
    JSON.stringify(config.user, null, 2).replace(/["{},]/g, ''),
    'Build configuration:'
  )

  // Theme configuration
  notify.debug(
    JSON.stringify(config.theme, null, 2).replace(/["{},[\]]/g, ''),
    'Theme configuration:'
  )

  done()
}
