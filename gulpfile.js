'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const fs          = require('fs');
const path        = require('path');
const del         = require('del');
const chalk       = require('chalk');
const rename      = require('gulp-rename');
const gulpif      = require('gulp-if');
const mjml        = require('gulp-mjml');
const mjmlEngine  = require('mjml');
const prettier    = require('gulp-prettier');
const sass        = require('gulp-sass');
const Fiber       = require('fibers');
sass.compiler     = require('sass');

//
// Import functions and variables.
//

const lib = './__lib/';

const { config }   = require(lib + 'functions/config.js');
const { arg }      = require(lib + 'functions/arg.js');
const err          = require(lib + 'functions/err.js');
const { log }      = require(lib + 'vars/log.js');
const paths        = require(lib + 'vars/paths.js');
const getFiles     = require(lib + 'functions/getFiles.js');
const { msg }      = require(lib + 'vars/notifications.js');
const { prod }     = require(lib + 'vars/prod.js');
const { debug }    = require(lib + 'vars/debug.js');

//
// Import tasks.
//

const clean          = require(lib + 'tasks/clean.js');
const buildSass      = require(lib + 'tasks/buildSass.js');
const watchSass      = require(lib + 'tasks/watchSass.js');
const listTemplates  = require(lib + 'tasks/listTemplates.js');
const handlebars     = require(lib + 'tasks/handlebars.js');
const buildTemplates = require(lib + 'tasks/buildTemplates.js');
const watchTemplates = require(lib + 'tasks/watchTemplates.js');

//
// Test function for debugging
//

// function test(done) {
//   console.log();
//   done();
// }
// exports.test = test;

//
// Prettier
//

const formatTemplates = require(lib + 'tasks/formatTemplates.js');

function formatSass() {
  return src(paths.sassDir + '**/*.scss')
    .pipe(
      prettier({
        parser: "scss"
      })
    )
    .on('error', err.handleError)
    .pipe(dest(file => file.base))
    .on('finish', function(source) {
      log(msg.info('Reformatted Sass files.'));
    })
}

//
// Tasks
//

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
