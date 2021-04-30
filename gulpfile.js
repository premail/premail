'use strict'

/* eslint-disable no-unused-vars */
const { series, parallel } = require('gulp')

const { userConfig } = require('./__lib/functions/userConfig.js')
const { log } = require('./__lib/vars/log.js')
const { msg } = require('./__lib/vars/notifications.js')
const { debug } = require('./__lib/vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Test function for debugging
//

// function test(done) {
//   log(msg.debug(()));
//   done();
// }
// exports.test = test;

//
// Tasks
//

const taskDir = './__lib/tasks/'

const cleanGen = require(taskDir + 'cleanGen.js')
const buildStyles = require(taskDir + 'buildStyles.js')
const watchStyles = require(taskDir + 'watchStyles.js')
const buildTemplates = require(taskDir + 'buildTemplates.js')
const listTemplates = require(taskDir + 'listTemplates.js')
const buildHTML = require(taskDir + 'buildHTML.js')
const watchHTML = require(taskDir + 'watchHTML.js')
const buildText = require(taskDir + 'buildText.js')
const watchText = require(taskDir + 'watchText.js')
const cleanTemp = require(taskDir + 'cleanTemp.js')

// Sets
exports.default = series(
  cleanTemp,
  cleanGen,
  buildStyles,
  buildTemplates,
  buildHTML,
  buildText,
  cleanTemp
)

exports.build = exports.default

exports.watch = parallel(watchStyles, watchHTML, watchText)

// Build
exports.buildHTML = buildHTML
exports.buildHTML.description =
  'Builds HTML files from MJML templates.\n                                  Options:\n                                    --prod: Renders a production file, minified and with HTML comments stripped out.\n                                    -d:     Specifies design folder to use. (Default: _templates)\n                                    -e:     Specifies email folder to render.'
exports.buildText = buildText
exports.buildText.description = 'Generates a plain-text version of the email.'
exports.buildStyles = buildStyles
exports.buildStyles.description =
  "Compiles Sass files in the 'theme' directory."
exports.buildTemplates = buildTemplates
exports.buildTemplates.description =
  'Builds MJML templates from Handlebars templates.'

// Watch
exports.watchHTML = watchHTML
exports.watchHTML.description =
  'Watches and renders HTML files for development (formatted, with comments).'
exports.watchStyles = watchStyles
exports.watchStyles.description = "Watches Sass files in the 'theme' directory."
exports.watchText = watchText
exports.watchText.description =
  'Watches rendered HTML file and regenerates plain-text version.'

// Debug
exports.listTemplates = listTemplates
exports.listTemplates.description =
  'List all templates that will be processed. Useful for debugging.'
exports.clean = parallel(cleanTemp, cleanGen)
exports.clean.description =
  'Remove all generated and temporary files from the current design or email.'
exports.cleanGen = cleanGen
exports.cleanGen.description =
  'Remove generated files from the current design or email.'
exports.cleanTemp = cleanTemp
exports.cleanTemp.description =
  'Remove temporary files from the current design or email.'
