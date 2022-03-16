'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')
const { series, parallel } = require('gulp')
/* eslint-enable no-unused-vars */

//
// Tasks
//
const loadConfig = require('./src/tasks/loadConfig')
const clean = require('./src/tasks/clean')
const build = require('./src/tasks/build')

// Build
exports.build = series(
  loadConfig,
  clean.generatedAsync,
  build.styles,
  build.content,
  build.structure
)

// Define tasks
exports.clean = clean.generatedSync
exports.buildContent = build.content
exports.buildStyles = build.styles
exports.buildStructure = build.structure

//
// Exports
//
module.exports = {
  build: exports.build,
}
