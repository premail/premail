'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const { log } = require('../vars/log.js')
const { debug } = require('../vars/debug.js')
const { msg } = require('../vars/notifications.js')
const { userConfig } = require('../functions/userConfig.js')
const { themeConfig } = require('../functions/themeConfig.js')
/* eslint-enable no-unused-vars */

//
// Display current configuration with debug
//

module.exports = function showConfig (done) {
  debug(
    msg.b('Build configuration:\n') +
      JSON.stringify(userConfig.data, null, 2).replace(/["{},]/g, '')
  )

  debug(
    msg.b('Design configuration:\n') +
      JSON.stringify(themeConfig.data, null, 2).replace(/["{},[\]]/g, '')
  )

  done()
}
