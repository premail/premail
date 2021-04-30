'use strict'

/* eslint-disable no-unused-vars */
const PluginError = require('plugin-error')
const sass = require('gulp-sass')
require('pretty-error').start()

const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
/* eslint-enable no-unused-vars */

//
// General errors
//

function handleError (err) {
  log(msg.error('\nError:'))
  log(msg.errorText(err) + '\n')
  this.emit('end')
}

// sass.logError
const sassError = function logError (error) {
  const message = new PluginError(
    'gulp-sass',
    error.messageFormatted
  ).toString()
  log(msg.error('\nSass processing error:'))
  log(`${message}\n`)
  this.emit('end')
}

// mjml.logError
const mjmlError = function logError (error) {
  const message = new PluginError('mjml', error.message).toString()
  log(msg.error('\nMJML processing error:'))
  log(`${message}\n`)
  this.emit('end')
}

module.exports = {
  handleError,
  sassError,
  mjmlError,
}
