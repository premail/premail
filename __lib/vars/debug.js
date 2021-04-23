'use strict';

const { arg } = require('../functions/arg.js');
const { msg } = require('./notifications.js');
const { log } = require('./log.js');

//
// Capture 'debug' from command-line flag.
//

let debug = function () { return '' };

if (arg.debug) {
  debug = function (message) {
    return log(msg.debug(message));
  }
}

module.exports = {
  debug
};
