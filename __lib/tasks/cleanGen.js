'use strict'

/* eslint-disable no-unused-vars */
const del = require('del')

const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Clean generated files and directories.
//

module.exports = function cleanGen (done) {
  notify.warn('Removing generated files...')

  const deletedFilePaths = [config.current.dist + '/*']

  del(deletedFilePaths)

  notify.debug(deletedFilePaths.join('\n'))

  done()
}
