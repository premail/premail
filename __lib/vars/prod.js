'use strict'

/* eslint-disable no-unused-vars */
const { arg } = require('../functions/arg.js')
const { msg } = require('../vars/notifications.js')
/* eslint-enable no-unused-vars */

//
// Capture 'prod' from command-line flag.
//

let prod = false

if (arg.prod) {
  prod = true
}

module.exports = {
  prod,
}
