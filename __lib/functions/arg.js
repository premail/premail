'use strict'

/* eslint-disable no-unused-vars */
const minimist = require('minimist')
/* eslint-enable no-unused-vars */

//
// Process arguments from the command-line.
//

const arg = (argList => {
  const arg = {}
  let a
  let opt
  let thisOpt
  let curOpt
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim()
    opt = thisOpt.replace(/^-+/, '')

    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt
      curOpt = null
    } else {
      // argument name
      curOpt = opt
      arg[curOpt] = true
    }
  }

  return arg
})(process.argv)

module.exports = {
  arg,
}
