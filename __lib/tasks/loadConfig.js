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
  // Validate user config
  validate('ascii', config.user.folders, 'config.yaml directory configuration')
  validate('ascii', config.user.files, 'config.yaml files configuration')
  validate('ascii', config.user.language, 'config.yaml language configuration')

  // Validate theme config
  validate(
    'size',
    config.theme.sections.main.horizontalPadding,
    'theme sections (main)'
  )
  validate(
    'size',
    config.theme.sections.salutation.padding,
    'theme sections (salutation)'
  )
  validate('size', config.theme.sections.body.padding, 'theme sections (body)')
  validate(
    'size',
    config.theme.sections.signoff.padding,
    'theme sections (signoff)'
  )
  validate('oneOf', config.theme.fonts.stack.base, 'theme font stack', [
    'sans',
    'serif',
    'mono',
  ])
  validate('url', config.theme.fonts.stack.custom.href, 'theme font stack')

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
