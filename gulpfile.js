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

const lib = './__lib/';

const clean           = require(lib + 'tasks/clean.js');
const buildSass       = require(lib + 'tasks/buildSass.js');
const watchSass       = require(lib + 'tasks/watchSass.js');
const listTemplates   = require(lib + 'tasks/listTemplates.js');
const handlebars      = require(lib + 'tasks/handlebars.js');
const buildTemplates  = require(lib + 'tasks/buildTemplates.js');
const watchTemplates  = require(lib + 'tasks/watchTemplates.js');
const formatTemplates = require(lib + 'tasks/formatTemplates.js');
const formatSass      = require(lib + 'tasks/formatSass.js');

// Sets
exports.default = series(
  clean,
  buildSass,
  buildTemplates
);

exports.build = exports.default;

exports.watch = parallel(
  watchSass,
  watchTemplates
);

// Build
exports.buildTemplates = buildTemplates;
exports.buildTemplates.description = "Builds HTML files from MJML templates.\n                                  Options:\n                                    --prod: Renders a production file, minified and with HTML comments stripped out.\n                                    -d:     Specifies design folder to use. (Default: _templates)\n                                    -e:     Specifies email folder to render.";
exports.buildSass = buildSass;
exports.buildSass.description = "Compiles Sass files in the 'theme' directory.";

// Watch
exports.watchTemplates = watchTemplates;
exports.watchTemplates.description = "Watches and renders HTML files for development (formatted, with comments).";
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
