'use strict'

/* eslint-disable no-unused-vars */
const mri = require('mri')
const argv = process.argv.slice(2)
/* eslint-enable no-unused-vars */

//
// Process flags from the command-line.
//

const flags = mri(argv)

module.exports = {
  flags,
}
