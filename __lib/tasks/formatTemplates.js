'use strict'

/* eslint-disable no-unused-vars */
const exec = require('child_process').exec
const err = require('../functions/err.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Process template files with Prettier
//

module.exports = function formatTemplates (done) {
  exec('prettier -w "**/*.{tpl,mjml}" --parser html', function (
    error,
    stdout,
    stderr
  ) {
    if (error) {
      log(msg.error(error.message))
    } else {
      debug(msg.b('Formatting templates:\n') + stdout)
    }
  })
  done()
}
