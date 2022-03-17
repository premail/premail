'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const symbols = require('log-symbols')
const {
  green,
  yellow,
  red,
  cyan,
  white,
  bgRed,
  bold,
  inverse,
} = require('kleur/colors')

// const colors = require('ansi-colors')
// const prioritizedColor = require('ansi-colors-prioritized')

const flags = require('yargs').argv
/* eslint-enable no-unused-vars */

//
// Set notifications
//

// Format messages
function msg(type, message, title = null) {
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
      symbolFormat = '\n ' + symbols.error
      if (title) {
        titleFormat = console.error(
          ` ${symbolFormat} ` + bgRed(white(bold(` ${title} `))) + ' '
        )
        messageFormat = console.error(red(`    ${message}`))
      } else {
        titleFormat = null
        messageFormat = console.error(
          ` ${symbolFormat} ` + red(bold(message)) + ' \n'
        )
      }
      break
    case 'warn':
      symbolFormat = '\n ' + symbols.warning
      if (title) {
        titleFormat = console.warn(
          inverse(yellow(bold(` ${symbolFormat} ${title} `)))
        )
        messageFormat = console.warn(yellow(`   ${message}`))
      } else {
        titleFormat = null
        messageFormat = console.warn(
          ` ${symbolFormat} ` + yellow(bold(message)) + ' \n'
        )
      }
      break
    case 'success':
      symbolFormat = '\n ' + symbols.success
      if (title) {
        titleFormat = console.log(` ${symbolFormat} ` + green(bold(title)))
        messageFormat = console.log(green(`   ${message}`))
      } else {
        titleFormat = null
        messageFormat = console.log(
          ` ${symbolFormat} ` + green(message) + ' \n'
        )
      }
      break
    case 'info':
      symbolFormat = '\n ' + symbols.info
      if (title) {
        titleFormat = console.log(` ${symbolFormat} ` + cyan(bold(title)))
        messageFormat = console.log(cyan(`   ${message}`))
      } else {
        titleFormat = null
        messageFormat = console.log(` ${symbolFormat} ` + cyan(message) + ' \n')
      }
      break
    case 'debug':
      if (flags.debug) {
        symbolFormat = '\n ' + symbols.info
        if (title) {
          titleFormat = console.log(` ${symbolFormat} ` + cyan(bold(title)))
          messageFormat = console.log(cyan(`   ${message}`))
        } else {
          titleFormat = null
          messageFormat = console.log(
            ` ${symbolFormat} ` + cyan(bold(message)) + ' \n'
          )
        }
      } else {
        return null
      }
      break
    case 'plain':
      if (title) {
        titleFormat = console.log(white(bold(title)))
        messageFormat = console.log(white(message))
      } else {
        titleFormat = null
        messageFormat = console.log(white(message))
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
        console.error(`\x1b[31mSupplied value was: "${type}"\x1b[0m\n`)
      }
  }

  return [titleFormat, messageFormat]
}

function watch(message) {
  return console.log(
    '\n ⌚ ' + inverse(green(bold(' ' + message.toUpperCase() + ' '))) + ' ⌚\n'
  )
}

function json(object, title = null) {
  let objectFormatted = '\n '
  if (title) {
    objectFormatted += `${symbols.info} ` + bold(title) + ' \n'
  }
  objectFormatted +=
    '\n ' + console.dir(object, { depth: null, colors: true }) + ' \n'
  return objectFormatted
}

function unjson(object, title = null) {
  let objectFormatted = '\n '
  if (title) {
    objectFormatted += `${symbols.info} ` + bold(title) + ' \n'
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
  return console.log(cyan(objectFormatted))
}

module.exports = {
  msg,
  watch,
  json,
  unjson,
}
