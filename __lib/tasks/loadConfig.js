'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const yaml = require('js-yaml')

const validate = require('../functions/validate.js')
const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
const { flags } = require('../vars/flags.js')
/* eslint-enable no-unused-vars */

//
// Validate and display configuration as necessary.
//
module.exports = function loadConfig (done) {
  // Run validation rules on config
  const validationRules = config.file.internal.validationRules
  for (const i in validationRules) {
    const selectors = validationRules[i].selectors
    const type = validationRules[i].type
    const file = validationRules[i].file
    const opt = validationRules[i].opt || null

    if (Array.isArray(selectors)) {
      for (const j in selectors) {
        const selector = validationRules[i].selectors[j]
        validate(type, selector, file, opt)
      }
    } else {
      const selector = selectors
      validate(type, selector, file, opt)
    }
  }

  // Display config when supplied with --debug
  if (flags.debug) {
    // Uncomment the following line to include internal configuration
    // notify.unjson(config.file.internal, 'Internal configuration:')

    // User-defined configuration (./config.yaml)
    notify.unjson(config.user, 'Build configuration:')

    // Theme configuration (./designs/<designName>/theme/themeConfig.yaml)
    notify.unjson(config.theme, 'Theme configuration:')

    done()
  } else {
    done()
  }
}
