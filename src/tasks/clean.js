'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const del = require('del')

const { config } = require.main.require('./src/config/setup')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Clean generated files and directories.
//

function generatedAsync(done) {
  notify.msg('warn', config.file.internal.messages.cleaning)
  const deletedFilePaths = [config.current.dist + '/*']
  del(deletedFilePaths)
  notify.msg('debug', deletedFilePaths.join('\n'))
  done()
}

function generatedSync() {
  notify.msg('warn', config.file.internal.messages.cleaning)
  const deletedFilePaths = [config.current.dist + '/*']
  del(deletedFilePaths)
  notify.msg('debug', deletedFilePaths.join('\n'))
}

module.exports = {
  generatedSync,
  generatedAsync,
}
