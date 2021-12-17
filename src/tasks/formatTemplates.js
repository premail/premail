'use strict'

/* eslint-disable no-unused-vars */
const exec = require('child_process').exec
const e = require('../ops/errors.js')
const { config } = require('../config/setup.js')
const notify = require('../ops/notifications.js')
/* eslint-enable no-unused-vars */

//
// Process template files with Prettier
//

module.exports = function formatTemplates (done) {
  const command =
    'prettier --config .prettierrc.yaml -w "' +
    config.current.path +
    '/**/*.{hbs,mjml}"'

  // While modern-node's `format` should be able to handle this formatting,
  // it doesn't seem to look at Prettier config files:
  // https://github.com/sheerun/modern-node/issues/12
  //
  // So we call Prettier directly.
  exec(command, function (err, stdout, stderr) {
    if (err) {
      e.e(err, 'prettier')
    } else {
      notify.msg('debug', stdout, 'Templates formatted:')
    }
  })
  done()
}
