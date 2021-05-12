'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const { config } = require('../vars/config.js')
const { log } = require('../vars/log.js')
const { debug } = require('../vars/debug.js')
const { msg } = require('../vars/notifications.js')
/* eslint-enable no-unused-vars */

//
// Display current configuration with debug
//

module.exports = function showConfig (done) {
  // Uncomment the following line to include internal configuration
  // debug(
  //   msg.b('Internal configuration:\n') +
  //     JSON.stringify(config.internal, null, 2).replace(/[\"{},]/g, '')
  // )

  // User-defined configuration
  debug(
    msg.b('Build configuration:\n') +
      JSON.stringify(config.user, null, 2).replace(/["{},]/g, '')
  )

  // Theme configuration
  debug(
    msg.b('Theme configuration:\n') +
      JSON.stringify(config.theme, null, 2).replace(/["{},[\]]/g, '')
  )

  done()
}
