'use strict'

/* eslint-disable no-unused-vars */
const PluginError = require('plugin-error')
require('pretty-error').start()

const notify = require('../ops/notifications.js')
/* eslint-enable no-unused-vars */

// General error-handling function.
// @TODO: Incorporate other error types into this one, accommodating
// .on('error')
function e (err, type = null, subtype = null) {
  const error = err.message

  switch (type) {
    case 'sass':
      // Handle YAML-to-JSON parsing errors.
      if (error.includes('theme.js') && error.includes('Error: expected')) {
        return notify.msg(
          'warn',
          'Sass variable import choked on the theme configuration. Did you make sure to double quote anything with CSS-reserved selectors like URLs?' +
            notify.colors.bold(` "'https://example.com/'" `) +
            'See the "SYNTAX NOTES" section at the top of your themeConfig.yaml file.',
          'Sass processing error:'
        )
      } else {
        return notify.msg('error', error, 'Sass processing error:')
      }
    case 'prettier':
      return notify.msg('error', error, 'Prettier error:')
    case 'validation':
      return (
        notify.msg('error', error + '\n', `${subtype} validation error:`),
        process.exit(1)
      )
    default:
      return notify.msg('error', error, 'Error:')
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
  e,
  hbError,
  mjmlError,
  textError,
}
