'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const { debug } = require('../vars/debug.js')
const { msg } = require('../vars/notifications.js')
const { log } = require('../vars/log.js')
const paths = require('../vars/paths.js')
/* eslint-enable no-unused-vars */

//
// Load theme config from YAML file.
//

const themeConfig = {}
themeConfig.json = yaml.loadAll(
  fs.readFileSync(path.join(paths.theme.path, 'themeConfig.yaml'), {
    encoding: 'utf-8',
  })
)
themeConfig.data = themeConfig.json[0]
debug(
  msg.b('Design configuration:\n') +
    JSON.stringify(themeConfig.data, null, 2).replace(/["{},[\]]/g, '')
)

//
// Construct additional variables dependent on theme config.
//

function constructVars () {
  // Web font
  if (
    themeConfig.data.fonts.options.google.enabled ||
    themeConfig.data.fonts.options.custom.enabled
  ) {
    themeConfig.data.fonts.web = true
  }

  // Google Font URI
  // encodeURI()
  if (themeConfig.data.fonts.options.google.enabled) {
    const weights = []
    let specs

    if (themeConfig.data.fonts.options.google.italics) {
      specs = 'ital,wght@'

      for (let weight of themeConfig.data.fonts.options.google.weights) {
        weight = '0,' + weight
        weights.push(weight)
      }

      for (let weight of themeConfig.data.fonts.options.google.weights) {
        weight = '1,' + weight
        weights.push(weight)
      }
    } else {
      specs = 'wght@'

      for (const weight of themeConfig.data.fonts.options.google.weights) {
        weights.push(weight)
      }
    }

    specs += weights.reduce(
      (s, x, i) => s + (i > 0 ? ';' : '') + (x == null ? '' : x),
      ''
    )

    themeConfig.data.fonts.options.google.href =
      'https://fonts.googleapis.com/css2?family=' +
      themeConfig.data.fonts.options.google.name.replace(/\s/g, '+') +
      ':' +
      specs +
      '&amp;display=swap'
  }
}

constructVars()

module.exports = {
  themeConfig,
}
