'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const path       = require('path');
const rename     = require('gulp-rename');
const mjml       = require('gulp-mjml');
const mjmlEngine = require('mjml');
const prettier   = require('gulp-prettier');
const prompt     = require('prompt-sync')({ sigint: true });

const name = prompt('What is your name? ');
console.log(`Hey there ${name}`);

//
// Config
//

const paths = {
  dist: path.resolve('/dist/'),
  srcMJML: path.resolve('./', '**/index.mjml'),
  destMJML: path.resolve('.'),
  srcPrettier: path.resolve('./', '**/*.mjml'),
  destPrettier: path.resolve('.')
}

//
// MJML
//

// MJML -> HTML: Development version (pretty-formatted, with comments)
function htmlDev() {
  return src(paths.srcMJML)
  .pipe(
    mjml(mjmlEngine, {
      beautify: true,
    })
    )
  .on('error', (e) => console.log(e))
  .pipe(
    rename(function (path) {
      path.dirname += paths.dist;
    })
    )
  .pipe(dest(paths.destMJML))
}

// MJML -> HTML: Production version (minified, no comments)
function htmlProd() {
  return src(paths.srcMJML)
    .pipe(
      mjml(mjmlEngine, {
        beautify: false,
        minify: true,
        keepComments: false,
      })
    )
    .on('error', (e) => console.log(e))
  .pipe(
    rename(function (path) {
      path.dirname += paths.dist;
    })
    )
    .pipe(dest(paths.destMJML))
}

//
// Prettier
//

function prettyMJML() {
  return src(paths.srcPrettier)
    .pipe(prettier())
    .on('error', (e) => console.log(e))
    .pipe(dest(paths.destPrettier))
}

//
// Tasks
//

// Gulp default
exports.default = series(devTemplates);

// Compile templates for development
function devTemplates(done) {
  return parallel(htmlDev)(done);
}
exports.devTemplates = devTemplates;
exports.devTemplates.description = "Builds MJML templates for development (formatted, with comments)";

// Build templates for production
function prodTemplates(done) {
  return parallel(htmlProd)(done);
}
exports.prodTemplates = prodTemplates;
exports.prodTemplates.description = "Builds MJML templates for production (minified, stripped comments)";

// Watch templates
function watchTemplates () {
  watch('./**/*.mjml', htmlDev);
}
exports.watchTemplates = watchTemplates;
exports.watchTemplates.description = "Watches and rebuilds templates for development (formatted, with comments)";

// Pretty MJML files
exports.prettyMJML = prettyMJML;
exports.prettyMJML.description = "Cleans up your MJML files with Prettier";



