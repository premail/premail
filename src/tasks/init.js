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

const dirs = {
  designDir: config.user.folders.design.name,
  designDefault: path.join(
    config.user.folders.design.name,
    config.user.folders.design.default
  ),
  themeDir: path.join(
    config.user.folders.design.name,
    config.user.folders.design.default,
    config.user.folders.theme.dir
  ),
  emailDir: config.user.folders.email.name,
  outputDir: config.user.folders.output.dir,
}

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
}

module.exports = {
  structure,
}
