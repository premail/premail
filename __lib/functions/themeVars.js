'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const config = require('../vars/config.js')
const { debug } = require('../vars/debug.js')
const { msg } = require('../vars/notifications.js')
const { log } = require('../vars/log.js')
/* eslint-enable no-unused-vars */

//
// Construct theme variables based on current configuration.
//

module.exports = function themeVars (done) {
  // Web font
  if (
    config.theme.data.fonts.stack.google.enabled ||
    config.theme.data.fonts.stack.custom.enabled
  ) {
    config.theme.data.fonts.web = true
  }

  // Google Font URI
  // encodeURI()
  if (config.theme.data.fonts.stack.google.enabled) {
    const weights = []
    let specs

    if (config.theme.data.fonts.stack.google.italics) {
      specs = 'ital,wght@'

      for (let weight of config.theme.data.fonts.stack.google.weights) {
        weight = '0,' + weight
        weights.push(weight)
      }

      for (let weight of config.theme.data.fonts.stack.google.weights) {
        weight = '1,' + weight
        weights.push(weight)
      }
    } else {
      specs = 'wght@'

      for (const weight of config.theme.data.fonts.stack.google.weights) {
        weights.push(weight)
      }
    }

    specs += weights.reduce(
      (s, x, i) => s + (i > 0 ? ';' : '') + (x == null ? '' : x),
      ''
    )

    config.theme.data.fonts.stack.google.href =
      'https://fonts.googleapis.com/css2?family=' +
      config.theme.data.fonts.stack.google.name.replace(/\s/g, '+') +
      ':' +
      specs +
      '&amp;display=swap'
  }

  done()
}
