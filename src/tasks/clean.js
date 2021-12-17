'use strict'

/* eslint-disable no-unused-vars */
const del = require('del')

const { config } = require('../config/setup.js')
const notify = require('../ops/notifications.js')
/* eslint-enable no-unused-vars */

//
// Clean generated files and directories.
//

function generated (done) {
  notify.msg('warn', config.file.internal.messages.cleaning)
  const deletedFilePaths = [config.current.dist + '/*']
  del(deletedFilePaths)
  notify.msg('debug', deletedFilePaths.join('\n'))
  done()
}

module.exports = {
  generated,
}
