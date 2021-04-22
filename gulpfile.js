'use strict';

const { series, parallel } = require('gulp');

//
// Test function for debugging
//

// function test(done) {
//   console.log();
//   done();
// }
// exports.test = test;

//
// Tasks
//

const taskDir = './__lib/tasks/';

const clean           = require(taskDir + 'clean.js');
const buildSass       = require(taskDir + 'buildSass.js');
const watchSass       = require(taskDir + 'watchSass.js');
const listTemplates   = require(taskDir + 'listTemplates.js');
const handlebars      = require(taskDir + 'handlebars.js');
const buildHTML       = require(taskDir + 'buildHTML.js');
const watchHTML       = require(taskDir + 'watchHTML.js');
const formatTemplates = require(taskDir + 'formatTemplates.js');
const formatSass      = require(taskDir + 'formatSass.js');

// Sets
exports.default = series(
  clean,
  buildSass,
  buildHTML
);

exports.build = exports.default;

exports.watch = parallel(
  watchSass,
  watchHTML
);

// Build
exports.buildHTML = buildHTML;
exports.buildHTML.description = "Builds HTML files from MJML templates.\n                                  Options:\n                                    --prod: Renders a production file, minified and with HTML comments stripped out.\n                                    -d:     Specifies design folder to use. (Default: _templates)\n                                    -e:     Specifies email folder to render.";
exports.buildSass = buildSass;
exports.buildSass.description = "Compiles Sass files in the 'theme' directory.";

// Watch
exports.watchHTML = watchHTML;
exports.watchHTML.description = "Watches and renders HTML files for development (formatted, with comments).";
exports.watchSass = watchSass;
exports.watchSass.description = "Watches Sass files in the 'theme' directory.";

// Format
exports.formatTemplates = formatTemplates;
exports.formatTemplates.description = "Format your MJML templates with Prettier.";
exports.formatSass = formatSass;
exports.formatSass.description = "Format your Sass code with Prettier.";

// Debug
exports.listTemplates = listTemplates;
exports.listTemplates.description = "List all templates that will be processed. Useful for debugging.";
exports.clean = clean;
exports.clean.description = "Remove all generated files from the current design or email."
