'use strict'

/* eslint-disable no-unused-vars */
const chalk = require('chalk')
/* eslint-enable no-unused-vars */

//
// Set notification formats.
//

const msg = {
  error: chalk.bgRed.bold.white,
  errorText: chalk.yellow,
  warn: chalk.bgYellow.black,
  warnText: chalk.yellow,
  info: chalk.hex('#37fd38'),
  debug: chalk.keyword('aqua'),
  b: chalk.bold,
}

module.exports = {
  msg,
}
