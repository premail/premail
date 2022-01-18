'use strict'

/* eslint-disable no-unused-vars */
const { flags } = require.main.require('./src/ops/flags')
const colors = require('ansi-colors')
const { symbols } = colors
/* eslint-enable no-unused-vars */

//
// Measure the length of a process
//
// Usage:
//   procTime(foo)
//   $ foo completed in 0.04ms
//
//   procTime(foo, 'bar')
//   $ bar completed in 0.04ms
//

module.exports = function procTime (func, name, ...args) {
  if (flags.debug) {
    const varToString = varObj => Object.keys(varObj)[0]
    let displayName
    if (!name) {
      displayName = func.name || varToString({ func })
    } else {
      displayName = name
    }
    displayName = colors.cyan(` ${symbols.info} ${displayName} completed in`)
    console.time(displayName)
    func(...args)
    console.timeEnd(displayName)
  }
}
