'use strict'

/* eslint-disable no-unused-vars */
const v = require('validator')

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

    switch (type) {
      case 'size':
        return v.matches(selector, /px$/gm)
          ? null
          : notify.msg(
              'error',
              `Value: ${selector}`,
              `MJML requires all sizes to be in pixels. Check ${subject}`
            )
      case 'ascii':
        return v.isAscii(selector)
          ? null
          : notify.msg(
              'error',
              `${selector}`,
              `Non-ASCII characters detected in ${subject}`
            )
      case 'oneof':
        return v.isIn(selector, opt)
          ? null
          : notify.msg(
              'error',
              `Set to '${selector}', but must be one of ${opt}`,
              `Invalid setting in ${subject}`
            )
      case 'url':
        return (
          v.matches(selector, /(^')(.*)('$)/gm)
            ? null
            : notify.msg(
                'error',
                `${selector}`,
                `URL value must be double quoted in ${subject}`
              ),
          v.isURL(unquoted)
            ? null
            : notify.msg('error', `${unquoted}`, `Invalid URL in ${subject}`)
        )
      default:
        return notify.msg(
          'error',
          `Requested validation type: ${type}`,
          'Validation type not recognized'
        )
    }
  }
}
