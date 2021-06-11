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

// Format messages
function msg (type, message, title = null) {
  let symbolFormat
  let titleFormat
  let messageFormat

  // Format message objects
  if (typeof message === 'object' && message.constructor === Object) {
    const messageArray = Object.values(message)
    if (messageArray[1]) {
      title = messageArray[0]
      message = messageArray[1]
    } else {
      message = messageArray[0]
    }
  }

  // Theme notification types
  switch (type) {
    case 'error':
      symbolFormat = '\n ' + symbols.cross
      if (title) {
        titleFormat = console.error(
          ' ' + colors.bgRed.white.bold(symbolFormat + ' ' + title + ' ') + ' '
        )
        messageFormat = console.error(colors.red('   ' + message))
      } else {
        titleFormat = null
        messageFormat = console.error(
          ' ' + colors.red.bold(symbolFormat + ' ' + message) + ' \n'
        )
      }
      break
    case 'warn':
      symbolFormat = '\n ' + symbols.warning
      if (title) {
        titleFormat = console.warn(
          ' ' +
            colors.bgYellow.black.bold(symbolFormat + ' ' + title + ' ') +
            ' '
        )
        messageFormat = console.warn(colors.yellow('   ' + message))
      } else {
        titleFormat = null
        messageFormat = console.warn(
          ' ' + colors.bgYellow.black(symbolFormat + ' ' + message) + ' \n'
        )
      }
      break
    case 'success':
      symbolFormat = '\n ' + symbols.check
      if (title) {
        titleFormat = console.log(
          ' ' +
            colors.green.greenBright.bold(symbolFormat + ' ' + title + ' ') +
            ' '
        )
        messageFormat = console.log(colors.green.greenBright('   ' + message))
      } else {
        titleFormat = null
        messageFormat = console.log(
          ' ' + colors.green.greenBright(symbolFormat + ' ' + message) + ' \n'
        )
      }
      break
    case 'info':
      symbolFormat = '\n ' + symbols.info
      if (title) {
        titleFormat = console.log(
          ' ' + colors.cyan.bold(symbolFormat + ' ' + title + ' ') + ' '
        )
        messageFormat = console.log(colors.cyan('   ' + message))
      } else {
        titleFormat = null
        messageFormat = console.log(
          ' ' + colors.cyan(symbolFormat + ' ' + message) + ' \n'
        )
      }
      break
    case 'debug':
      if (flags.debug) {
        symbolFormat = '\n ' + symbols.info
        if (title) {
          titleFormat = console.log(
            ' ' + colors.cyan.bold(symbolFormat + ' ' + title + ' ') + ' '
          )
          messageFormat = console.log(colors.cyan('   ' + message))
        } else {
          titleFormat = null
          messageFormat = console.log(
            ' ' + colors.cyan.bold(symbolFormat + ' ' + message) + ' \n'
          )
        }
      } else {
        return null
      }
      break
    case 'plain':
      if (title) {
        titleFormat = console.log(colors.white.bold(title))
        messageFormat = console.log(colors.white(message))
      } else {
        titleFormat = null
        messageFormat = console.log(colors.white(message))
      }
      break
    default:
      console.error(
        '\n\x1b[1;41;37mERROR: Notification type not recognized.\x1b[0m'
      )
      if (typeof type === 'object' && type.constructor === Object) {
        console.error(
          '\x1b[31mSupplied value-by-reference was: "' +
            Object.keys(type) +
            '"\x1b[0m\n'
        )
      } else {
        console.error('\x1b[31mSupplied value was: "' + type + '"\x1b[0m\n')
      }
  }

  return [titleFormat, messageFormat]
}

function watch (message) {
  return console.log(
    '\n ⌚ ' +
      colors.bgGreen.black.bold(' ' + message.toUpperCase() + ' ') +
      ' ⌚\n'
  )
}

function json (object, title = null) {
  let objectFormatted = '\n '
  if (title) {
    objectFormatted += symbols.info + ' ' + colors.bold(title) + ' \n'
  }
  objectFormatted +=
    '\n ' + console.dir(object, { depth: null, colors: true }) + ' \n'
  return objectFormatted
}

function unjson (object, title = null) {
  let objectFormatted = '\n '
  if (title) {
    objectFormatted += symbols.info + ' ' + colors.bold(title) + ' \n'
  }
  const objectFlattened = JSON.stringify(object, null, 2)

  objectFormatted +=
    ' ' +
    objectFlattened
      .replace(/["{},]/g, '')
      .replace(/[[]/g, '')
      .replace(/[\]]/g, '')
      .replace(/^ {2}/gm, '') +
    ' \n'
  return console.log(colors.cyan(objectFormatted))
}

module.exports = {
  msg,
  watch,
  json,
  unjson,
  colors,
}
