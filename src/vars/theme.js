'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const { config } = require('../vars/config.js')
const { user } = require('../vars/config.js')
/* eslint-enable no-unused-vars */

//
// Set up theme configuration
//

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

// Load theme config from YAML file.
const themeYAML = fs.readFileSync(
  path.join(config.current.theme.path, config.file.theme),
  {
    encoding: 'utf-8',
  }
)
const themeJSON = yaml.loadAll(themeYAML)
config.theme = themeJSON[0]

// Calculating internal-only (not included in config file) theme settings.
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

// Because we can't access nested objects in the Sass files, we need to define
// and export each object in turn.
const page = config.theme.page
const colors = config.theme.colors
const fonts = config.theme.fonts
const text = config.theme.text.default
const links = config.theme.links
const lists = config.theme.lists
const signoff = config.theme.signoff
const typography = config.user.details.typography

module.exports = {
  config,
  page,
  colors,
  fonts,
  text,
  links,
  lists,
  signoff,
  typography,
}
