'use strict'

/* eslint-disable no-unused-vars */
const chalk = require('chalk')
const { flags } = require('../vars/flags.js')
/* eslint-enable no-unused-vars */

//
// Set notifications
//

// Standard logging function.
const log = console.log

// Notification formats
const msg = {
  error: chalk.bgRed.bold.white,
  errorText: chalk.yellow,
  warn: chalk.bgYellow.black,
  warnText: chalk.yellow,
  info: chalk.hex('#37fd38'),
  debug: chalk.keyword('aqua'),
  b: chalk.bold,
}

// Shorten call to debug notifications
let debug = function () {
  return ''
}

if (flags.debug) {
  debug = function (message) {
    return log(msg.debug(message))
  }
}

module.exports = {
  log,
  msg,
  debug,
}
