'use strict'

/* eslint-disable no-unused-vars */
const exec = require('child_process').exec
const path = require('path')
const flags = require('yargs').argv

const e = require.main.require('./src/ops/errors')
const { config } = require.main.require('./src/config/setup')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Process template and theme files with Prettier
//

let noFormat = false
if (flags.f || flags.noformat) {
  noFormat = true
}

module.exports = function format(display) {
  if (!noFormat) {
    const prettier = 'npx prettier'
    let prettierArgs = ' --config .prettierrc.yaml --write'

    // If we're not processing an email, format design files
    if (!config.current.email.name) {
      prettierArgs += ` "${config.current.design.path}/*.yaml"`
      prettierArgs += ` "${config.current.theme}/*.scss"`
    }

    // Add templates
    prettierArgs += ` "${config.current.path}/**/*.hbs"`

    // Exclude any generated files
    prettierArgs += ` "!${config.current.path}/dist/*.*"`

    // Run the formatting
    const command = prettier + prettierArgs
    exec(command, function (err, stdout, stderr, display) {
      if (err) {
        e.e(err, 'prettier')
      } else {
        if (display) {
          notify.msg('info', stdout, 'Files formatted:')
        } else {
          notify.msg('debug', stdout, 'Files formatted:')
        }
      }
    })
  }
}
