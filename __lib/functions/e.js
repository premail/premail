'use strict'

/* eslint-disable no-unused-vars */
const PluginError = require('plugin-error')
const sass = require('gulp-sass')
require('pretty-error').start()

const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
/* eslint-enable no-unused-vars */

function handleError (error, pluginName) {
  // Ensure a pluginName is passed.
  if (!pluginName) {
    return log(msg.error('The handleError function must include a pluginName.'))

    // General errors
  } else {
    pluginName = pluginName.charAt(0).toUpperCase() + pluginName.slice(1)
    const message = new PluginError(pluginName, error.message).toString()
    return log(msg.errorText(`\n${message}\n`))
  }
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

// handlebars.logError
const hbError = function logError (error) {
  const message = new PluginError('handlebars', error.message).toString()
  log(msg.error('\nHandlebars processing error (gulp-hb):'))
  log(`${message}\n`)
  log(msg.error('Error: Templates were not created!\n'))
  this.emit('end')
}

// mjml.logError
const mjmlError = function logError (error) {
  const message = new PluginError('mjml', error.message).toString()
  log(msg.error('\nMJML processing error:'))
  log(`${message}\n`)
  log(msg.error('Error: HTML was not built!\n'))
  this.emit('end')
}

module.exports = {
  handleError,
  sassError,
  hbError,
  mjmlError,
}
