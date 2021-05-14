'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const { config } = require('../vars/config.js')
const { debug } = require('../vars/debug.js')
const { msg } = require('../vars/notifications.js')
const { log } = require('../vars/log.js')
/* eslint-enable no-unused-vars */

//
// Construct theme variables based on current configuration.
//

module.exports = function themeVars (done) {
  // @TODO: Convert this to gulp
  // Create temporary JSON file of double-quoted theme config
  fs.mkdirsSync(config.current.theme.temp)
  const themeConfig = path.join(config.current.theme.temp, 'themeConfig.json')
  fs.writeFileSync(themeConfig, JSON.stringify(config.theme, null, 2))

  // Web font
  config.theme.fonts.web = false
  if (
    config.theme.fonts.stack.google.enabled ||
    config.theme.fonts.stack.custom.enabled
  ) {
    config.theme.fonts.web = true
  }

  // Google Font URI
  if (config.theme.fonts.stack.google.enabled) {
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
      'https://fonts.googleapis.com/css2?family=' +
      config.theme.fonts.stack.google.name.replace(/\s/g, '+') +
      ':' +
      specs +
      '&amp;display=swap'
  }

  // Custom Font URI
  if (config.theme.fonts.stack.custom.enabled) {
    config.theme.fonts.stack.custom.href = config.theme.fonts.stack.custom.href.replace(
      /'/g,
      ''
    )
  }

  done()
}
