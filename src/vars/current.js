'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const projectPath = require('../functions/projectPath.js')
const getFiles = require('../functions/getFiles.js')

const { config } = require('../vars/config.js')
const { flags } = require('../vars/flags.js')
/* eslint-enable no-unused-vars */

//
// Load current paths based on user and theme settings
//

// Load user settings
config.file.user = 'config.yaml'

if (fs.existsSync(config.file.user)) {
  const userJSON = yaml.loadAll(
    fs.readFileSync(config.file.user, { encoding: 'utf-8' })
  )
  config.user = userJSON[0]
  config.user.__base = '.'

  config.current = {
    mainTemplate: config.user.files.template,
  }

  config.current.design = config.user.folders.design.default

  if (flags.d) {
    config.current.design = flags.d
  }

  config.current.email = ''

  if (flags.e) {
    config.current.email = flags.e
  }

  if (config.current.email) {
    config.current.name = config.current.email
    config.current.path = projectPath(
      config.__base,
      config.user.folders.email.name,
      config.current.email
    )
    config.current.dist = projectPath(
      config.__base,
      config.user.folders.email.name,
      config.current.design,
      config.user.folders.output.dir
    )
  } else {
    config.current.name = config.current.design
    config.current.path = projectPath(
      config.__base,
      config.user.folders.design.name,
      config.current.design
    )
    config.current.dist = projectPath(
      config.__base,
      config.user.folders.design.name,
      config.current.design,
      config.user.folders.output.dir
    )
  }

  // Load theme settings
  config.file.theme = 'themeConfig.yaml'

  if (fs.existsSync(config.file.theme)) {
    config.current.theme = {
      name: config.user.folders.theme.dir,
      path: path.join(
        config.user.__base,
        config.user.folders.design.name,
        config.current.design,
        config.user.folders.theme.dir
      ),
    }

    // Load theme config from YAML file.
    const themeYAML = fs.readFileSync(
      path.join(config.current.theme.path, config.file.theme),
      {
        encoding: 'utf-8',
      }
    )
    const themeJSON = yaml.loadAll(themeYAML)
    config.theme = themeJSON[0]
  }
}

module.exports = {
  config,
}
