'use strict'

/* eslint-disable no-unused-vars */
const del = require('del')

const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Clean temporary files and directories.
//

module.exports = function cleanTemp (done) {
  notify.warn('Removing temporary files...')

  const deletedFilePaths = [config.current.emailTemp, config.current.designTemp]

  del(deletedFilePaths)

  notify.debug(deletedFilePaths.join('\n'))

  done()
}
