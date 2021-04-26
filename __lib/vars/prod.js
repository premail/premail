'use strict';

const { arg } = require('../functions/arg.js');
const { msg } = require('../vars/notifications.js');

//
// Capture 'prod' from command-line flag.
//

let prod = false;

if (arg.prod) {
  prod = true;
}

module.exports = {
  prod
};
