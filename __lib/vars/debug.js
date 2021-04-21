'use strict';

const { arg } = require('../functions/arg.js');
const { msg } = require('./notifications.js');

//
// Capture 'debug' from command-line flag.
//

let debug = function () { return '' };

if (arg.debug) {
  debug = msg.debug;
}

module.exports = {
  debug
};
