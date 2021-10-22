'use strict'

/* eslint-disable no-unused-vars */
const { series, parallel } = require('gulp')
/* eslint-enable no-unused-vars */

//
// Tasks
//

const taskDir = './__lib/tasks/'

const loadConfig = require(taskDir + 'loadConfig.js')
const cleanGenerated = require(taskDir + 'clean.js')
const buildProject = require(taskDir + 'build.js')
const watchEmail = require(taskDir + 'watchEmail.js')
const listTemplates = require(taskDir + 'listTemplates.js')
const formatTemplates = require(taskDir + 'formatTemplates.js')

// Tell gulp tasks to use display names instead of function names
cleanGenerated.generated.displayName = 'cleanGenerated.generated'
buildProject.content.displayName = 'build.content'
buildProject.styles.displayName = 'build.styles'
buildProject.render.displayName = 'build.render'

// Sets
exports.default = series(
  loadConfig,
  formatTemplates,
  cleanGenerated.generated,
  buildProject.styles,
  buildProject.content,
  buildProject.render
)

exports.buildProject = exports.default
exports.buildProject.description =
  'Render a complete HTML email based on design and email templates.'
exports.buildProject.flags = {
  '     -d': 'Specify design folder to use. (Default: _templates)',
  '     -e': 'Specify email folder to render.',
  ' --prod': 'Render production files (minified, no comments).',
  ' --temp':
    'Include intermediate rendered template (post-Handlebars, pre-MJML) in output.',
  '--debug': 'Display details about configuration and settings.',
}

// Provide one-off versions of build tasks
exports.buildContent = buildProject.content
exports.buildStyles = buildProject.styles
exports.buildRender = buildProject.render

// Watch
exports.watch = series(
  loadConfig,
  formatTemplates,
  buildProject.styles,
  buildProject.content,
  buildProject.render,
  watchEmail
)
exports.watch.description =
  'Watch design and configuration files and rebuild (formatted, with comments) as necessary. Flags from `gulp build` can also be used.'

// Format
exports.formatTemplates = formatTemplates
exports.formatTemplates.description = 'Format templates with Prettier.'

// Clean
exports.cleanGenerated = cleanGenerated.generated
exports.cleanGenerated.description =
  'Remove generated files from the current design or email.'

// Debug
exports.loadConfig = loadConfig
exports.loadConfig.description =
  'Load the current configuration being used to render your email. To print to the console, use with --debug'
exports.listTemplates = listTemplates
exports.listTemplates.description =
  'List all templates that will be processed. Use with --debug'
exports.test = async function () {
  console.log('\n\nTest.\n\n')
}
exports.test.description = 'Run an empty gulp function for testing.'

// Exports
const build = exports.buildProject
const watch = exports.watch
const format = exports.formatTemplates
const clean = exports.cleanGenerated
const load = exports.loadConfig
const list = exports.listTemplates
const test = exports.test
module.exports = {
  build,
  watch,
  format,
  clean,
  load,
  list,
  test,
}
