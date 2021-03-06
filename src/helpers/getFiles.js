'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
/* eslint-enable no-unused-vars */

//
// List all files in a directory.
//

module.exports = function getFiles(base, ext, files, result) {
  files = files || fs.readdirSync(base)
  result = result || []

  files.forEach(function (file) {
    const newbase = path.join(base, file)
    if (fs.statSync(newbase).isDirectory()) {
      result = getFiles(newbase, ext, fs.readdirSync(newbase), result)
    } else {
      if (file.substr(-1 * (ext.length + 1)) === '.' + ext) {
        result.push(newbase)
      }
    }
  })
  return result
}
