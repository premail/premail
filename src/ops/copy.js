'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const flags = require('yargs').argv

const isDirEmpty = require.main.require('./src/helpers/isDirEmpty')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Iterate over and copy file structure
//
module.exports = function copy(source, dest, list = false) {
  const path = fs.readdirSync(source)

  if (flags.debug) {
    list = true
  }

  if (list) {
    for (const i in path) {
      notify.msg('plain', `Creating '${path[i]}'`)
    }
  }

  try {
    fs.copySync(source, dest)
  } catch (err) {
    notify.msg('error', err)
  }

  notify.msg('success', 'Done.')
}
