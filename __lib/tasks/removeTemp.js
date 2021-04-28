'use strict'

/* eslint-disable no-unused-vars */
const del = require('del')

const paths = require('../vars/paths.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Remove temporary files and directories.
//

module.exports = function removeTemp (done) {
  log(msg.warn('Deleting temporary files...'))

  const deletedFilePaths = [paths.design.path + '/.tmp']

  del.sync(deletedFilePaths)

  debug(deletedFilePaths.join('\n'))

  done()
}
