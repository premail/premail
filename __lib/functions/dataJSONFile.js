'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')

const e = require('../functions/e.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Save data to a JSON file
//

module.exports = function dataJSONFile (
  source,
  destDir,
  destFile,
  fileDescription = 'Your data'
) {
  const destPath = path.join(destDir, destFile)

  fs.stat(destPath, function (err, stat) {
    if (err == null) {
      // File exists; do nothing.
    } else if (err.code === 'ENOENT') {
      fs.mkdirSync(destDir, { recursive: true }, err => {
        if (err) {
          e.handleError(err, 'fs-mkdir')
        }
      })

      fs.writeFile(destPath, JSON.stringify(source, null, 2), function (err) {
        if (err) {
          e.handleError(err, 'fs-writeFile')
        }
        notify.debug(destPath, fileDescription + ' written to disk:')
      })
    } else {
      notify.error(err.code, 'File creation error:')
    }
  })
}
