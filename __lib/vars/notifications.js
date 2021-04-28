'use strict'

/* eslint-disable no-unused-vars */
const chalk = require('chalk')
/* eslint-enable no-unused-vars */

//
// Set notification formats.
//

const msg = {
  error: chalk.bgRed.bold.white,
  warn: chalk.bgYellow.black,
  info: chalk.hex('#37fd38'),
  debug: chalk.keyword('aqua'),
  b: chalk.bold,
}

module.exports = {
  msg,
}
