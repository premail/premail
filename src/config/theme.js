'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const projectPath = require('../helpers/projectPath.js')
const getFiles = require('../helpers/getFiles.js')

const { config } = require('../config/setup.js')
const { current } = require('../config/current.js')
/* eslint-enable no-unused-vars */

//
// Load theme settings
//

if (fs.existsSync(config.file.user)) {
  config.file.theme = 'themeConfig.yaml'

  config.current.theme = {
    name: config.user.folders.theme.dir,
    path: path.join(
      config.user.__base,
      config.user.folders.design.name,
      config.current.design,
      config.user.folders.theme.dir
    ),
  }

  config.current.theme.file = path.join(
    config.current.theme.path,
    config.file.theme
  )

  if (
    fs.existsSync(config.file.user) &&
    fs.existsSync(config.current.theme.file)
  ) {
    // Load theme config from YAML file.
    const themeYAML = fs.readFileSync(
      path.join(config.current.theme.path, config.file.theme),
      {
        encoding: 'utf-8',
      }
    )
    const themeJSON = yaml.loadAll(themeYAML)
    config.theme = themeJSON[0]

    // Prepare internal-only (not included in config file) theme settings.
    if (config.theme.fonts) {
      // Font stack
      config.theme.fonts.stack.first = ''

      // Web font
      config.theme.fonts.web = false
      if (
        config.theme.fonts.stack.google.enabled ||
        config.theme.fonts.stack.custom.enabled
      ) {
        config.theme.fonts.web = true
      }

      // Custom Font URI
      if (config.theme.fonts.stack.custom.enabled) {
        config.theme.fonts.stack.first = config.theme.fonts.stack.custom.name
      }

      // Google Font URI
      if (config.theme.fonts.stack.google.enabled) {
        config.theme.fonts.stack.first = config.theme.fonts.stack.google.name
        const weights = []
        let specs

        if (config.theme.fonts.stack.google.italics) {
          specs = 'ital,wght@'

          for (let weight of config.theme.fonts.stack.google.weights) {
            weight = '0,' + weight
            weights.push(weight)
          }

          for (let weight of config.theme.fonts.stack.google.weights) {
            weight = '1,' + weight
            weights.push(weight)
          }
        } else {
          specs = 'wght@'

          for (const weight of config.theme.fonts.stack.google.weights) {
            weights.push(weight)
          }
        }

        specs += weights.reduce(
          (s, x, i) => s + (i > 0 ? ';' : '') + (x == null ? '' : x),
          ''
        )

        config.theme.fonts.stack.google.href =
          "'https://fonts.googleapis.com/css2?family=" +
          config.theme.fonts.stack.google.name.replace(/\s/g, '+') +
          ':' +
          specs +
          "&amp;display=swap'"
      }
    }

    if (config.theme.head) {
      config.theme.head.array = ''
      for (const i of config.theme.head) {
        config.theme.head.array += i.html
      }
    }
  }
}

module.exports = {
  config,
}
