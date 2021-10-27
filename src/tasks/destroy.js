'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')

const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Destroy project structure
//

const dirs = config.init.dirs

function structure () {
  notify.msg('info', 'Destroying directories')
  for (const i in dirs) {
    try {
      if (fs.existsSync(dirs[i])) {
        fs.rmdirSync(dirs[i], { recursive: true })
        notify.msg('debug', `Destroyed directory '${dirs[i]}'`)
      } else {
        notify.msg('debug', `Directory '${dirs[i]}' does not exist; skipping`)
      }
    } catch (err) {
      notify.msg('error', err)
    }
  }
}

module.exports = {
  structure,
}
