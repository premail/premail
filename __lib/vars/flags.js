'use strict'

/* eslint-disable no-unused-vars */
const minimist = require('minimist')
/* eslint-enable no-unused-vars */

//
// Process flags from the command-line.
//

const flags = (flagList => {
  const flags = {}
  let f
  let opt
  let thisOpt
  let curOpt
  for (f = 0; f < flagList.length; f++) {
    thisOpt = flagList[f].trim()
    opt = thisOpt.replace(/^-+/, '')

    if (opt === thisOpt) {
      // argument value
      if (curOpt) flags[curOpt] = opt
      curOpt = null
    } else {
      // argument name
      curOpt = opt
      flags[curOpt] = true
    }
  }

  return flags
})(process.argv)

module.exports = {
  flags,
}
