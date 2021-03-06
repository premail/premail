'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')
const flags = require('yargs').argv

const getFiles = require.main.require('./src/helpers/getFiles')

const { config } = require.main.require('./src/config/setup')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Load current paths for design and email based on settings
//

config.current = {}

// Load project settings
config.file.project = 'premail.yaml'

if (fs.existsSync(config.file.project)) {
  const projectJSON = yaml.loadAll(
    fs.readFileSync(config.file.project, { encoding: 'utf-8' })
  )
  config.project = projectJSON[0]
  config.project.__base = '.'

  // Determine design path
  config.current.design = {}
  config.current.design.name = config.project.dirs.design.default
  if (flags.d) {
    config.current.design.name = String(flags.d)
  }
  config.current.design.path = path.join(
    config.project.__base,
    config.project.dirs.design.name,
    config.current.design.name
  )

  // Load design settings
  config.file.design = path.join(
    config.current.design.path,
    'designConfig.yaml'
  )
  if (fs.existsSync(config.file.design)) {
    const designJSON = yaml.loadAll(
      fs.readFileSync(config.file.design, { encoding: 'utf-8' })
    )
    config.design = { ...config.file.internal.design, ...designJSON[0] }
  } else {
    notify.msg(
      'error',
      `Path: ${config.file.design}`,
      `Design config file not found. Aborting.`
    )
    process.exit(1)
  }

  // Set theme dir
  if (fs.existsSync(config.file.design)) {
    if (config.design.dirs.theme && config.design.dirs.theme.dir) {
      config.design.theme = path.join(
        config.current.design.path,
        config.design.dirs.theme.dir
      )
    } else if (config.project.dirs.theme && config.project.dirs.theme.dir) {
      // @depreciated since 2.1.0.
      // Will be removed by 3.0.0.
      // Accounts for old location of theme dir config.
      config.design.theme = path.join(
        config.current.design.path,
        config.project.dirs.theme.dir
      )
    } else {
      config.design.theme = path.join(
        config.current.design.path,
        config.project.dirs.design.theme.dir
      )
    }
    config.current.theme = config.design.theme
  }

  // Test if email is set
  config.current.email = {}
  config.current.email.name = ''
  if (flags.e) {
    config.current.email.name = String(flags.e)
  }

  // If no email is set, build based on design
  if (!config.current.email.name) {
    config.current.name = config.current.design
    config.current.path = config.current.design.path

    // Set output dir
    if (config.design.dirs.output && config.design.dirs.output.dir) {
      config.design.dist = path.join(
        config.current.path,
        config.design.dirs.output.dir
      )
    } else {
      config.design.dist = path.join(
        config.current.path,
        config.project.dirs.output.dir
      )
    }
    config.current.dist = config.design.dist

    // If email is set, build based on email
  } else {
    // Set email path
    config.current.email.path = path.join(
      config.project.__base,
      config.project.dirs.email.name,
      config.current.email.name
    )
    config.current.name = config.current.email.name
    config.current.path = config.current.email.path

    // Load email settings
    config.file.email = path.join(config.current.email.path, 'emailConfig.yaml')
    if (fs.existsSync(config.file.email)) {
      const emailJSON = yaml.loadAll(
        fs.readFileSync(config.file.email, { encoding: 'utf-8' })
      )
      config.email = emailJSON[0]
    } else {
      notify.msg(
        'error',
        `Path: ${config.file.email}`,
        `Email config file not found. Aborting.`
      )
      process.exit(1)
    }

    // Set output dir
    if (config.email.dirs.output) {
      config.email.dist = path.join(
        config.current.path,
        config.email.dirs.output.dir
      )
    } else {
      config.email.dist = path.join(
        config.current.path,
        config.project.dirs.output.dir
      )
    }
    config.current.dist = config.email.dist
  }
}

module.exports = {
  config,
}
