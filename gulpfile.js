'use strict'

/* eslint-disable no-unused-vars */
const { series, parallel } = require('gulp')
/* eslint-enable no-unused-vars */

//
// Tasks
//

const taskDir = './src/tasks/'

const init = require(taskDir + 'init.js')
const destroy = require(taskDir + 'destroy.js')
const loadConfig = require(taskDir + 'loadConfig.js')
const clean = require(taskDir + 'clean.js')
const build = require(taskDir + 'build.js')
const watchEmail = require(taskDir + 'watchEmail.js')
const listTemplates = require(taskDir + 'listTemplates.js')
const formatTemplates = require(taskDir + 'formatTemplates.js')

// Tell gulp tasks to use display names instead of function names
clean.generated.displayName = 'clean.generated'
build.content.displayName = 'build.content'
build.styles.displayName = 'build.styles'
build.render.displayName = 'build.render'

// Sets
exports.default = series(
  loadConfig,
  formatTemplates,
  clean.generated,
  build.styles,
  build.content,
  build.render
)

// Build
exports.build = exports.default

// Provide one-off versions of build tasks
exports.buildContent = build.content
exports.buildStyles = build.styles
exports.buildRender = build.render

// Watch
exports.watch = series(
  loadConfig,
  formatTemplates,
  build.styles,
  build.content,
  build.render,
  watchEmail
)

// Format
exports.formatTemplates = formatTemplates

// Clean
exports.clean = clean.generated

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

//
// Exports
//

// Non-gulp functions are called directly. Public tasks export the definitions
// registered above.
module.exports = {
  init: init.structure,
  destroy: destroy.structure,
  build: exports.build,
  watch: exports.watch,
  format: exports.formatTemplates,
  clean: exports.clean,
  load: exports.loadConfig,
  list: exports.listTemplates,
  test: exports.test,
}
