'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const flags = require('yargs').argv

const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { design } = require.main.require('./src/config/design')
const isDirEmpty = require.main.require('./src/helpers/isDirEmpty')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Copy source to new destination
//
module.exports = function copy(
  source,
  dest,
  type = null,
  list = false,
  overwrite = false
) {
  let sourcePath
  let sourceMsg
  let destPath

  if (type === 'email') {
    // If email source is unset, source is the blank email template.
    if (source === false) {
      sourcePath = config.scaf.email
      sourceMsg = 'Blank email template'
    } else {
      sourcePath = `${config.project.dirs.email.name}/${source}`
      sourceMsg = sourcePath
    }

    destPath = `${config.project.dirs.email.name}/${dest}`
  } else if (type === 'design') {
    // If design source is unset, source is the default design.
    if (source === false) {
      sourcePath = `${config.project.dirs.design.name}/${config.project.dirs.design.default}`
    } else {
      sourcePath = `${config.project.dirs.design.name}/${source}`
    }

    sourceMsg = sourcePath
    destPath = `${config.project.dirs.design.name}/${dest}`
  }

  // Unknown copy type
  else {
    notify.msg('error', 'Unknown option for `premail new`')
    process.exit(1)
  }

  // Check if destination exists
  if (!overwrite && fs.existsSync(destPath) && !isDirEmpty(destPath)) {
    notify.msg(
      'error',
      `The path ${destPath} already has data. Aborting.`,
      'Directory not empty'
    )
    process.exit(1)
  }

  // Create new item from copy
  notify.msg(
    'info',
    `Source: ${sourceMsg}\n   Destination: ${destPath}\n`,
    `Creating new ${type}`
  )

  if (flags.debug) {
    list = true
  }

  // Provide list of files being created
  if (list) {
    const readDir = fs.readdirSync(sourcePath)
    for (const i in readDir) {
      notify.msg('plain', `Creating '${readDir[i]}'`)
    }
  }

  // Perform the copy
  try {
    fs.copySync(sourcePath, destPath)
  } catch (err) {
    notify.msg('error', err)
  }

  notify.msg('success', 'Done.')
}
