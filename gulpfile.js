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
const watch = require('./src/tasks/watch')
const listTemplates = require('./src/tasks/listTemplates')
const formatTemplates = require('./src/tasks/formatTemplates')

// Build
exports.build = series(
  loadConfig,
  formatTemplates,
  clean.generated,
  build.styles,
  build.content,
  build.structure
)

// Provide one-off versions of build tasks
exports.buildContent = build.content
exports.buildStyles = build.styles
exports.buildStructure = build.structure

// Rebuild for watch
exports.rebuild = series(build.styles, build.content, build.structure)

// Templates
exports.formatTemplates = formatTemplates
exports.listTemplates = listTemplates

// Clean
exports.clean = clean.generated

//
// Exports
//

// Non-gulp functions are called directly. Public tasks export the definitions
// registered above.
module.exports = {
  init: init.structure,
  destroy: destroy.structure,
  build: exports.build,
  watch: watch.email,
  rebuild: exports.rebuild,
  format: exports.formatTemplates,
  clean: exports.clean,
  load: exports.loadConfig,
  list: exports.listTemplates,
  test: exports.test,
}
