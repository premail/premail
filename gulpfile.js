'use strict'

/* eslint-disable no-unused-vars */
const { series, parallel } = require('gulp')
/* eslint-enable no-unused-vars */

//
// Tasks
//

const taskDir = './__lib/tasks/'

const showConfig = require(taskDir + 'showConfig.js')
const clean = require(taskDir + 'clean.js')
const build = require(taskDir + 'build.js')
const watchEmail = require(taskDir + 'watchEmail.js')
const listTemplates = require(taskDir + 'listTemplates.js')
const formatTemplates = require(taskDir + 'formatTemplates.js')

// Tell gulp tasks to use display names instead of function names
clean.generated.displayName = 'clean.generated'
build.styles.displayName = 'build.styles'
build.email.displayName = 'build.email'

// Sets
exports.default = series(showConfig, clean.generated, build.styles, build.email)

exports.build = exports.default
exports.build.description =
  'Render a complete HTML email based on design and email templates.'
exports.build.flags = {
  '--prod': 'Render production files (minified, no comments).',
  '    -d': 'Specify design folder to use. (Default: _templates)',
  '    -e': 'Specify email folder to render.',
}

// Watch
exports.watch = series(build.styles, build.email, watchEmail)
exports.watch.description =
  'Watch design and configuration files and rebuild (formatted, with comments) as necessary.'

// Format
exports.formatTemplates = formatTemplates
exports.formatTemplates.description = 'Format templates with Prettier.'

// Clean
exports.clean = parallel(clean.generated)
exports.clean.description =
  'Remove generated files from the current design or email.'

// Debug
exports.showConfig = showConfig
exports.showConfig.description =
  'Display the current configuration being used when rendering your email files.'
exports.listTemplates = listTemplates
exports.listTemplates.description =
  'List all templates that will be processed. Useful for debugging.'
exports.test = async function () {
  console.log('\n\nTest.\n\n')
}
exports.test.description = 'Run an empty gulp function for testing.'
