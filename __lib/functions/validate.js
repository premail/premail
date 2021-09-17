'use strict'

/* eslint-disable no-unused-vars */
const v = require('validator')

const e = require('../functions/e.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

// Validate if selector is a string, otherwise iterate over it.
module.exports = function validate (type, selector, subject, opt) {
  if (typeof selector === 'object' && selector.constructor === Object) {
    iterate(type, selector, subject, opt)
  } else {
    scan(type, selector, subject, opt)
  }
}

// Iterate over a selector until something that isn't an object or boolean is
// encountered. Note that numbers are coerced into strings.
function iterate (type, selector, subject, opt) {
  for (var k in selector) {
    if (typeof selector[k] === 'object' && selector[k] !== null) {
      iterate(type, selector[k], subject, opt)
    } else if (typeof selector[k] === 'boolean') {
      iterate(type, selector[k], subject, opt)
    } else if (typeof selector[k] === 'number') {
      selector[k] = selector[k] + ''
      scan(type, selector[k], subject, opt)
    } else {
      scan(type, selector[k], subject, opt)
    }
  }
}

// Process validation of strings and notify on failures.
function scan (type, selector, subject, opt) {
  if (selector !== null) {
    const unquoted = v.trim(selector, "'")
    let err

    switch (type) {
      // Size: Must be in pixels.
      case 'size':
        err = {
          message: `MJML requires all sizes to be in pixels. Check ${subject}\n      Value: ${selector}`,
          type: 'validation',
          subtype: 'Size',
        }
        return v.matches(selector, /px$/gm)
          ? null
          : e.e(err, err.type, err.subtype)
      // ASCII: Strings that are restricted to ASCII characters.
      case 'ascii':
        err = {
          message: `Non-ASCII characters detected in ${subject}\n      ${selector}`,
          type: 'validation',
          subtype: 'ASCII',
        }
        return v.isAscii(selector) ? null : e.e(err, err.type, err.subtype)
      // oneOf: Only certain strings are valid.
      case 'oneOf':
        err = {
          message: `Invalid setting in ${subject}\n      Set to '${selector}', but must be one of ${opt}`,
          type: 'validation',
          subtype: 'One-of',
        }
        return v.isIn(selector, opt) ? null : e.e(err, err.type, err.subtype)
      // url: Validate URLs/URIs and ensure they're double-quoted.
      case 'url':
        err = {
          type: 'validation',
          subtype: 'URL',
          quote: {
            message: `URL value must be double quoted in ${subject}\n      ${selector}`,
          },
          url: {
            message: `Invalid URL in ${subject}\n      ${unquoted}`,
          },
        }
        return (
          v.matches(selector, /(^')(.*)('$)/gm)
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
