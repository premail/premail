'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const { series, parallel } = require('gulp')
/* eslint-enable no-unused-vars */

//
// Tasks
//
const init = require('./src/tasks/init')
const destroy = require('./src/tasks/destroy')
const loadConfig = require('./src/tasks/loadConfig')
const clean = require('./src/tasks/clean')
const build = require('./src/tasks/build')
const watchEmail = require('./src/tasks/watchEmail')
const listTemplates = require('./src/tasks/listTemplates')
const formatTemplates = require('./src/tasks/formatTemplates')

// Tell gulp tasks to use display names instead of function names
clean.generated.displayName = 'clean.generated'
build.content.displayName = 'build.content'
build.styles.displayName = 'build.styles'
build.structure.displayName = 'build.structure'

// Sets
exports.default = series(
  loadConfig,
  formatTemplates,
  clean.generated,
  build.styles,
  build.content,
  build.structure
)

// Build
exports.build = exports.default

// Provide one-off versions of build tasks
exports.buildContent = build.content
exports.buildStyles = build.styles
exports.buildStructure = build.structure

// Watch
exports.watch = series(
  loadConfig,
  formatTemplates,
  build.styles,
  build.content,
  build.structure,
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
