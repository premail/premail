'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const flags = require('yargs').argv

const isDirEmpty = require.main.require('./src/helpers/isDirEmpty')
const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { design } = require.main.require('./src/config/design')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Create a new project item (design or email)
//

function item() {
  // Command name, from yargs
  const premailNew = flags._[0]

  // Command arguments, from yargs; these are required and so are always set.
  const newType = flags._[1]
  const newDest = flags._[2]

  let emailSource = false
  if (flags.e) {
    emailSource = flags.e
  }

  let designSource = false
  if (flags.d) {
    designSource = flags.d
  }

  let sourceMsg
  let sourcePath
  let destMsg
  let destPath

  // New email
  if (premailNew && newType === 'email') {
    if (emailSource === false) {
      sourcePath = `${config.project.dirs.email.name}/NEEDTOCREATETHIS`
      sourceMsg = 'Source: Blank email template'
    } else {
      sourcePath = `${config.project.dirs.email.name}/${emailSource}`
      sourceMsg = `Source: ${sourcePath}`
    }
    destPath = `${config.project.dirs.email.name}/${newDest}`
    destMsg = `Destination: ${destPath}`

    notify.msg('info', `${sourceMsg}\n   ${destMsg}`, 'Creating new email')
  }

  // New design
  else if (premailNew && newType === 'design') {
    if (designSource === false) {
      sourcePath = `${config.project.dirs.design.name}/${config.project.dirs.design.default}`
    } else {
      sourcePath = `${config.project.dirs.design.name}/${designSource}`
    }
    sourceMsg = `Source: ${sourcePath}`
    destPath = `${config.project.dirs.design.name}/${newDest}`
    destMsg = `Destination: ${destPath}`

    notify.msg('info', `${sourceMsg}\n   ${destMsg}`, 'Creating new design')
  }

  // Unknown option
  else if (premailNew) {
    notify.msg('error', 'Unknown option for `premail new`')
  } else {
    // Technically yargs will prevent this fallback condition ever being met.
    return null
  }
}

module.exports = {
  item,
}
