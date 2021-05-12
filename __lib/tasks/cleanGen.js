'use strict'

/* eslint-disable no-unused-vars */
const del = require('del')

const { config } = require('../vars/config.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Clean generated files and directories.
//

module.exports = function cleanGen (done) {
  log(msg.warn('Deleting generated files...'))

  const deletedFilePaths = [config.current.dist + '/*']

  del.sync(deletedFilePaths)

  debug(deletedFilePaths.join('\n'))

  done()
}
