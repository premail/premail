'use strict';

const chalk = require('chalk');

//
// Set notification formats.
//

const msg = {
  error: chalk.bgRed.bold.white,
  warn:  chalk.bgYellow.black,
  info:  chalk.green,
  debug: chalk.keyword('aqua'),
  b:     chalk.bold
}

module.exports = {
  msg
};
