'use strict'

/* eslint-disable no-unused-vars */
const { series, parallel } = require('gulp')

const { log } = require('./__lib/vars/log.js')
const { msg } = require('./__lib/vars/notifications.js')
const { debug } = require('./__lib/vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Tasks
//

const taskDir = './__lib/tasks/'

const showConfig = require(taskDir + 'showConfig.js')
const cleanGen = require(taskDir + 'cleanGen.js')
const buildStyles = require(taskDir + 'buildStyles.js')
const { watchStyles, watchHTML, watchText } = require(taskDir + 'watchEmail.js')
const buildTemplates = require(taskDir + 'buildTemplates.js')
const listTemplates = require(taskDir + 'listTemplates.js')
const formatTemplates = require(taskDir + 'formatTemplates.js')
const buildHTML = require(taskDir + 'buildHTML.js')
const buildText = require(taskDir + 'buildText.js')
const cleanTemp = require(taskDir + 'cleanTemp.js')

// Sets
exports.default = series(
  showConfig,
  cleanTemp,
  cleanGen,
  buildStyles,
  formatTemplates,
  buildTemplates,
  buildHTML,
  buildText,
  cleanTemp
)

exports.build = exports.default
exports.build.description =
  'Render a complete HTML email based on design and email templates.\n                                  Options:\n                                    --prod: Render production files (minified, no comments).\n                                    -d:     Specify design folder to use. (Default: _templates)\n                                    -e:     Specify email folder to render.'

exports.watch = parallel(watchStyles, watchHTML, watchText)
exports.watch.description =
  'Watch design and configuration files and rebuild (formatted, with comments) as necessary.'

exports.clean = parallel(cleanTemp, cleanGen)
exports.clean.description =
  'Remove all generated and temporary files from the current design or email.'

// Build
exports.buildStyles = buildStyles
exports.buildStyles.description =
  'Build CSS files from Sass files in the "theme" folder.'
exports.buildTemplates = buildTemplates
exports.buildTemplates.description =
  'Build MJML templates from Handlebars templates.'
exports.buildHTML = buildHTML
exports.buildHTML.description = 'Build HTML files from MJML templates.'
exports.buildText = buildText
exports.buildText.description = 'Generate a plain-text version of the email.'

// Format
exports.formatTemplates = formatTemplates
exports.formatTemplates.description = 'Format MJML templates with Prettier.'

// Clean
exports.cleanTemp = cleanTemp
exports.cleanTemp.description =
  'Remove temporary files from the current design or email.'
exports.cleanGen = cleanGen
exports.cleanGen.description =
  'Remove generated files from the current design or email.'

// Debug
exports.showConfig = showConfig
exports.showConfig.description =
  'Display the current configuration being used when rendering your email files.'
exports.listTemplates = listTemplates
exports.listTemplates.description =
  'List all templates that will be processed. Useful for debugging.'
