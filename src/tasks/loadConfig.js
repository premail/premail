'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const yaml = require('js-yaml')

const validate = require('../ops/validation.js')
const { config } = require('../config/setup.js')
const { current } = require('../config/current.js')
const { theme } = require('../config/theme.js')
const { sassImport } = require('../config/sassImport.js')
const notify = require('../ops/notifications.js')
const { flags } = require('../ops/flags.js')
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
    const opt = validationRules[i].opt || null

    if (Array.isArray(selectors)) {
      for (const j in selectors) {
        const selector = validationRules[i].selectors[j]
        validate(type, selector, opt)
      }
    } else {
      const selector = selectors
      validate(type, selector, opt)
    }
  }

  // Display config when supplied with --debug
  if (flags.debug) {
    // Uncomment the following line to include internal configuration
    // notify.unjson(config.file.internal, 'Internal configuration:')

    // User-defined configuration (config.yaml)
    if (config.user) {
      notify.unjson(config.user, 'Build configuration:')
    }

    // Theme configuration (themeConfig.yaml)
    if (config.theme) {
      notify.unjson(config.theme, 'Theme configuration:')
    }

    done()
  } else {
    done()
  }
}
