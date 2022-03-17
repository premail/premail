'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
/* eslint-enable no-unused-vars */

//
// Determine if a directory is empty.
//

module.exports = function isDirEmpty(path) {
  return fs.readdirSync(path).length === 0
}
