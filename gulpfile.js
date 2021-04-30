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
exports.build.description =
  'Render a complete HTML email based on design and email templates.\n                                  Options:\n                                    --prod: Render production files (minified, no comments).\n                                    -d:     Specify design folder to use. (Default: _templates)\n                                    -e:     Specify email folder to render.'

exports.watch = parallel(watchStyles, watchHTML, watchText)
exports.watch.description =
  'Watch both design and template files and rebuild (formatted, with comments) as necessary.'

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

// Watch
exports.watchStyles = watchStyles
exports.watchStyles.description = 'Watch Sass and rebuild CSS files on changes.'
exports.watchHTML = watchHTML
exports.watchHTML.description =
  'Watch templates and rebuild HTML files on changes.'
exports.watchText = watchText
exports.watchText.description =
  'Watch rendered HTML file and rebuild plain-text version on changes.'

// Debug
exports.listTemplates = listTemplates
exports.listTemplates.description =
  'List all templates that will be processed. Useful for debugging.'
exports.cleanTemp = cleanTemp
exports.cleanTemp.description =
  'Remove temporary files from the current design or email.'
exports.cleanGen = cleanGen
exports.cleanGen.description =
  'Remove generated files from the current design or email.'
