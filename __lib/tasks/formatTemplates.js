'use strict'

/* eslint-disable no-unused-vars */
const exec = require('child_process').exec
const e = require('../functions/e.js')
const { config } = require('../vars/config.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Process template files with Prettier
//

module.exports = function formatTemplates (done) {
  const command =
    'prettier --config .prettierrc.yaml -w "' +
    config.current.path +
    '/**/*.{tpl,mjml}"'

  // While modern-node's `format` should be able to handle this formatting,
  // it doesn't seem to look at Prettier config files:
  // https://github.com/sheerun/modern-node/issues/12
  //
  // So we call Prettier directly.
  exec(command, function (error, stdout, stderr) {
    if (error) {
      e.handleError(error, 'prettier')
    } else {
      debug(msg.b('Templates formatted:\n') + stdout)
    }
  })
  done()
}
