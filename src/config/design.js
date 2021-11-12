'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const getFiles = require('../helpers/getFiles.js')

const { config } = require('../config/setup.js')
const { current } = require('../config/current.js')
/* eslint-enable no-unused-vars */

//
// Load design settings
//

if (fs.existsSync(config.file.project) && fs.existsSync(config.file.design)) {
  // Prepare internal-only (not included in config file) design settings.
  if (config.design.fonts) {
    // Font stack
    config.design.fonts.stack.first = ''

    // Web font
    config.design.fonts.web = false
    if (
      config.design.fonts.stack.google.enabled ||
      config.design.fonts.stack.custom.enabled
    ) {
      config.design.fonts.web = true
    }

    // Custom Font URI
    if (config.design.fonts.stack.custom.enabled) {
      config.design.fonts.stack.first = config.design.fonts.stack.custom.name
    }

    // Google Font URI
    if (config.design.fonts.stack.google.enabled) {
      config.design.fonts.stack.first = config.design.fonts.stack.google.name
      const weights = []
      let specs

      if (config.design.fonts.stack.google.italics) {
        specs = 'ital,wght@'

        for (let weight of config.design.fonts.stack.google.weights) {
          weight = '0,' + weight
          weights.push(weight)
        }

        for (let weight of config.design.fonts.stack.google.weights) {
          weight = '1,' + weight
          weights.push(weight)
        }
      } else {
        specs = 'wght@'

        for (const weight of config.design.fonts.stack.google.weights) {
          weights.push(weight)
        }
      }

      specs += weights.reduce(
        (s, x, i) => s + (i > 0 ? ';' : '') + (x == null ? '' : x),
        ''
      )

      config.design.fonts.stack.google.href =
        "'https://fonts.googleapis.com/css2?family=" +
        config.design.fonts.stack.google.name.replace(/\s/g, '+') +
        ':' +
        specs +
        "&amp;display=swap'"
    }
  }

  if (config.design.head) {
    config.design.head.array = ''
    for (const i of config.design.head) {
      config.design.head.array += i.html
    }
  }
}

module.exports = {
  config,
}
