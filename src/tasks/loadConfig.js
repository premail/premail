'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const validate = require.main.require('./src/ops/validation')
const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { design } = require.main.require('./src/config/design')
const { sassImport } = require.main.require('./src/config/sassImport')
const { flags } = require.main.require('./src/ops/flags')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Validate and display configuration as necessary.
//
module.exports = function loadConfig (done) {
  // Check if primary config exists; exit on error if it does not
  if (!fs.existsSync(config.file.project)) {
    notify.msg('error', config.file.internal.messages.noSettings)
    process.exit(1)
  }

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

    // Project-defined configuration (premail.yaml)
    if (config.project) {
      notify.unjson(config.project, 'Project configuration:')
    }

    // Design configuration (designConfig.yaml)
    if (config.design) {
      notify.unjson(config.design, 'Design configuration:')
    }

    done()
  } else {
    done()
  }
}
