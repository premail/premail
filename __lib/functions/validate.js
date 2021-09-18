'use strict'

/* eslint-disable no-unused-vars */
const v = require('validator')

const { config } = require('../vars/config.js')
const e = require('../functions/e.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

module.exports = function validate (type, selector, file, opt) {
  const value = selector
    .replace(/^config\./gm, '')
    .split('.')
    .reduce((a, b) => a[b], config)
  const location = selector.replace(/^config\..*?\./gm, '')

  if (value !== null) {
    checkType(type, value, location, file, opt)
  }
}

// If value is a string, send it to be validated; if not, iterate over it.
function checkType (type, value, location, file, opt) {
  if (typeof value === 'object' && value.constructor === Object) {
    iterate(type, value, location, file, opt)
  } else {
    scan(type, value, location, file, opt)
  }
}

// Iterate over a value until something that isn't an object or boolean is
// encountered. Note that numbers are coerced into strings.
function iterate (type, value, location, file, opt) {
  for (var k in value) {
    if (typeof value[k] === 'object' && value[k] !== null) {
      iterate(type, value[k], location, file, opt)
    } else if (typeof value[k] === 'boolean') {
      iterate(type, value[k], location, file, opt)
    } else if (typeof value[k] === 'number') {
      value[k] = value[k] + ''
      scan(type, value[k], location, file, opt)
    } else {
      scan(type, value[k], location, file, opt)
    }
  }
}

// Process validation of strings and notify on failures.
function scan (type, value, location, file, opt) {
  if (value !== null) {
    const unquoted = v.trim(value, "'")
    let err

    switch (type) {
      // Size: Must be in pixels.
      case 'size':
        err = {
          message: `MJML requires all sizes to be in pixels. Check ${file}\n   ${location}: ${value}`,
          type: 'validation',
          subtype: 'Size',
        }
        return v.matches(value, /px$/gm)
          ? null
          : e.e(err, err.type, err.subtype)
      // ASCII: Strings that are restricted to ASCII characters.
      case 'ascii':
        err = {
          message: `Non-ASCII characters detected in ${file}:\n   ${location}: ${value}`,
          type: 'validation',
          subtype: 'ASCII',
        }
        return v.isAscii(value) ? null : e.e(err, err.type, err.subtype)
      // oneOf: Only certain strings are valid.
      case 'oneOf':
        err = {
          message: `Invalid setting in ${file}\n   ${location} set to '${value}', but must be one of: ${opt}`,
          type: 'validation',
          subtype: 'One-of',
        }
        return v.isIn(value, opt) ? null : e.e(err, err.type, err.subtype)
      // url: Validate URLs/URIs and ensure they're double-quoted.
      case 'url':
        err = {
          type: 'validation',
          subtype: 'URL',
          quote: {
            message: `URL value must be double quoted in ${file}\n   ${location}: ${value}`,
          },
          url: {
            message: `Invalid URL in ${file}\n   ${location}: ${unquoted}`,
          },
        }
        return (
          v.matches(value, /(^')(.*)('$)/gm)
            ? null
            : e.e(err.quote, err.type, err.subtype),
          v.isURL(unquoted) ? null : e.e(err.url, err.type, err.subtype)
        )
      // Display an error if an unrecognized validation is requested.
      default:
        err = {
          message: `Validation type not recognized\n   Requested validation type: ${type}`,
        }
        throw e.e(err)
    }
  }
}
