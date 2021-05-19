'use strict'

/* eslint-disable no-unused-vars */
const colors = require('ansi-colors')
const { flags } = require('../vars/flags.js')
/* eslint-enable no-unused-vars */

//
// Set notifications
//

// Set message styles
const { symbols } = colors

function error (message, title = null) {
  let messageFormatted = '\n ' + symbols.cross
  if (title) {
    messageFormatted += ' ' + colors.bold(title) + ' \n'
  }
  messageFormatted += ' ' + message + ' \n'
  return console.log(colors.bgRed(colors.white(messageFormatted)))
}

function warn (message, title = null) {
  let messageFormatted = '\n ' + symbols.warning
  if (title) {
    messageFormatted += ' ' + colors.bold(title) + ' \n'
  }
  messageFormatted += ' ' + message + ' \n'
  return console.log(colors.bgYellow(colors.black(messageFormatted)))
}

function info (message, title = null) {
  let messageFormatted = '\n ' + symbols.check
  if (title) {
    messageFormatted += ' ' + colors.bold(title) + ' \n'
  }
  messageFormatted += ' ' + message + ' \n'

  return console.log(colors.bgGreen(colors.white(messageFormatted)))
}

function debug (message, title = null) {
  if (flags.debug) {
    let messageFormatted = '\n ' + symbols.info
    if (title) {
      messageFormatted += ' ' + colors.bold(title) + ' \n'
    }
    messageFormatted += ' ' + message + ' \n'
    return console.log(colors.cyan(messageFormatted))
  } else {
    return null
  }
}

function plain (message) {
  return console.log(colors.unstyle(message))
}

module.exports = {
  error,
  warn,
  info,
  debug,
  plain,
}
