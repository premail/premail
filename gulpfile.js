'use strict';

const { series, parallel } = require('gulp');

const { config } = require('./__lib/functions/config.js');
const { log }    = require('./__lib/vars/log.js');
const { msg }    = require('./__lib/vars/notifications.js');
const { debug }  = require('./__lib/vars/debug.js');

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

const taskDir = './__lib/tasks/';

const clean           = require(taskDir + 'clean.js');
const buildStyles     = require(taskDir + 'buildStyles.js');
const watchStyles     = require(taskDir + 'watchStyles.js');
const buildTemplates  = require(taskDir + 'buildTemplates.js');
const listTemplates   = require(taskDir + 'listTemplates.js');
const buildHTML       = require(taskDir + 'buildHTML.js');
const watchHTML       = require(taskDir + 'watchHTML.js');
const buildText       = require(taskDir + 'buildText.js');
const watchText       = require(taskDir + 'watchText.js');
const formatTemplates = require(taskDir + 'formatTemplates.js');
const formatStyles    = require(taskDir + 'formatStyles.js');
const removeTemp      = require(taskDir + 'removeTemp.js');

// Sets
exports.default = series(
  clean,
  buildStyles,
  buildTemplates,
  buildHTML,
  buildText,
  removeTemp
);

exports.build = exports.default;

exports.watch = parallel(
  watchStyles,
  watchHTML,
  watchText
);

// Build
exports.buildHTML = buildHTML;
exports.buildHTML.description = "Builds HTML files from MJML templates.\n                                  Options:\n                                    --prod: Renders a production file, minified and with HTML comments stripped out.\n                                    -d:     Specifies design folder to use. (Default: _templates)\n                                    -e:     Specifies email folder to render.";
exports.buildText = buildText;
exports.buildText.description = "Generates a plain-text version of the email.";
exports.buildStyles = buildStyles;
exports.buildStyles.description = "Compiles Sass files in the 'theme' directory.";
exports.buildTemplates = buildTemplates;
exports.buildTemplates.description = "Builds MJML templates from Handlebars templates.";

// Watch
exports.watchHTML = watchHTML;
exports.watchHTML.description = "Watches and renders HTML files for development (formatted, with comments).";
exports.watchStyles = watchStyles;
exports.watchStyles.description = "Watches Sass files in the 'theme' directory.";
exports.watchText = watchText;
exports.watchText.description = "Watches rendered HTML file and regenerates plain-text version.";

// Format
exports.formatTemplates = formatTemplates;
exports.formatTemplates.description = "Format your MJML templates with Prettier.";
exports.formatStyles = formatStyles;
exports.formatStyles.description = "Format your Sass code with Prettier.";

// Debug
exports.listTemplates = listTemplates;
exports.listTemplates.description = "List all templates that will be processed. Useful for debugging.";
exports.clean = clean;
exports.clean.description = "Remove all generated files from the current design or email."
exports.removeTemp = removeTemp;
exports.removeTemp.description = "Remove temporary files generated during individual tasks."
