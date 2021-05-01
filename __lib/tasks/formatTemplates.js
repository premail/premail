'use strict'

/* eslint-disable no-unused-vars */
const exec = require('child_process').exec
const err = require('../functions/err.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Process template files with Prettier
//

module.exports = function formatTemplates (done) {
  // This will use `--parser handlebars` once this issue:
  // https://github.com/prettier/prettier/pull/10290
  // is included in a release of Prettier.
  //
  // Currently erroring on partial inclusion; see:
  // https://github.com/ember-template-lint/ember-template-lint/issues/486
  exec('prettier -w "**/*.{tpl,mjml}" --parser glimmer', function (
    error,
    stdout,
    stderr
  ) {
    if (error) {
      log(msg.error(error.message))
    } else {
      debug(msg.b('Formatting templates:\n') + stdout)
    }
  })
  done()
}
