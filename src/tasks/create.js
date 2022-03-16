'use strict'

/* eslint-disable no-unused-vars */
const flags = require('yargs').argv

const copy = require.main.require('./src/ops/copy')
/* eslint-enable no-unused-vars */

//
// Create a new project item (design or email)
//
function item() {
  // Command arguments, from yargs; these are required and so are always set.
  const type = flags._[1]
  const dest = String(flags._[2])

  let source = false

  if (flags.e && type === 'email') {
    source = String(flags.e)
  } else if (flags.d && type === 'design') {
    source = String(flags.d)
  }

  copy(source, dest, type)
}

module.exports = {
  item,
}
