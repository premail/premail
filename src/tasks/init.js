'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')

const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Create project structure
//

const dirs = config.init.dirs

function structure () {
  notify.msg('info', 'Creating directories')
  for (const i in dirs) {
    try {
      if (!fs.existsSync(dirs[i])) {
        fs.mkdirSync(dirs[i])
        notify.msg('debug', `Created directory '${dirs[i]}'`)
      } else {
        notify.msg('debug', `Directory '${dirs[i]}' exists; skipping`)
      }
    } catch (err) {
      notify.msg('error', err)
    }
  }

  notify.msg('info', 'Creating files')
  try {
    fs.copySync(config.init.templates, dirs.designDefault)
  } catch (err) {
    notify.msg('error', err)
  }
}

module.exports = {
  structure,
}
