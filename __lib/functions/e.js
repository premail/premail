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

// Handlebars
const hbError = function logError (error) {
  const message = new PluginError('gulp-hb', error.message).toString()
  log(msg.error('\nHandlebars processing error:'))
  log(`${message}\n`)
  log(msg.error('Error: Templates were not created!\n'))
  this.emit('end')
}

// File-include
const includeError = function logError (error) {
  const message = new PluginError('gulp-file-include', error.message).toString()
  log(msg.error('\nFile-include error:'))
  log(msg.errorText(`${message}\n`))
  this.emit('end')
}

// MJML
const mjmlError = function logError (error) {
  const message = new PluginError('gulp-mjml', error.message).toString()
  log(msg.error('\nMJML processing error:'))
  log(`${message}\n`)
  log(msg.error('Error: HTML was not built!\n'))
  this.emit('end')
}

// Plain text
const textError = function logError (error) {
  const message = new PluginError('gulp-html2txt', error.message).toString()
  log(msg.error('\nPlain-text generation error:'))
  log(`${message}\n`)
  log(msg.error('Error: Plain text version was not built!\n'))
  this.emit('end')
}

module.exports = {
  handleError,
  sassError,
  hbError,
  includeError,
  mjmlError,
  textError,
}
