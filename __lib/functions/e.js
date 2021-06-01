'use strict'

/* eslint-disable no-unused-vars */
const PluginError = require('plugin-error')
const sass = require('gulp-sass')
require('pretty-error').start()

const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

function handleError (error, pluginName) {
  // Ensure a pluginName is passed.
  if (!pluginName) {
    return notify.msg(
      'error',
      'The handleError function must include a pluginName.'
    )

    // General errors
  } else {
    pluginName = pluginName.charAt(0).toUpperCase() + pluginName.slice(1)
    const message = new PluginError(pluginName, error.message).toString()
    return notify.msg('error', `\n${message}\n`)
  }
}

// sass.logError
const sassError = function logError (error) {
  const message = new PluginError(
    'gulp-sass',
    error.messageFormatted
  ).toString()
  if (message.includes('theme.js') && message.includes('Error: expected')) {
    notify.msg(
      'warn',
      'Sass variable import choked on the theme configuration. Did you make sure to double quote anything with CSS-reserved selectors like URLs?' +
        notify.colors.bold(` "'https://example.com/'" `) +
        'See the "SYNTAX NOTES" section at the top of your themeConfig.yaml file.',
      'Style import error:'
    )
    notify.msg('error', `${message}`, 'Sass processing error:')
    this.emit('end')
  } else {
    notify.msg('error', `${message}`, 'Sass processing error:')
    this.emit('end')
  }
}

// Handlebars
const hbError = function logError (error) {
  const message = new PluginError('gulp-hb', error.message).toString()
  notify.msg('error', `${message}`, 'Handlebars processing error:')
  notify.msg('error', '', 'Templates were not created!')
  this.emit('end')
}

// MJML
const mjmlError = function logError (error) {
  const message = new PluginError('gulp-mjml', error.message).toString()
  notify.msg('error', `${message}`, 'MJML processing error:')
  notify.msg('error', '', 'HTML was not built!')
  this.emit('end')
}

// Plain text
const textError = function logError (error) {
  const message = new PluginError('gulp-html2txt', error.message).toString()
  notify.msg('error', `${message}`, 'Plain-text generation error:')
  notify.msg('error', '', 'Plain text version was not built!')
  this.emit('end')
}

module.exports = {
  handleError,
  sassError,
  hbError,
  mjmlError,
  textError,
}
