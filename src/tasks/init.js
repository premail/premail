'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')

const { config } = require('../config/setup.js')
const notify = require('../ops/notifications.js')
/* eslint-enable no-unused-vars */

//
// Create project structure
//

const source = config.init
const dest = '.'

function structure () {
  try {
    fs.copySync(source, dest)
    notify.msg('success', 'Premail project initialized!')
  } catch (err) {
    notify.msg('error', err)
  }
}

module.exports = {
  structure,
}
