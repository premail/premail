'use strict'

/* eslint-disable no-unused-vars */
const del = require('del')

const { config } = require('../vars/config.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Clean temporary files and directories.
//

module.exports = function cleanTemp (done) {
  log(msg.warn('Deleting temporary files...'))

  const deletedFilePaths = [config.current.emailTemp, config.current.designTemp]

  del(deletedFilePaths)

  debug(deletedFilePaths.join('\n'))

  done()
}
