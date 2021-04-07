'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const fs         = require('fs')
const path       = require('path');
const rename     = require('gulp-rename');
const mjml       = require('gulp-mjml');
const mjmlEngine = require('mjml');
const prettier   = require('gulp-prettier');

// @TODO use or remove
// const prompt     = require('prompt-sync')({ sigint: true });
// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

//
// Config
//

// Acquire directory information
const getDirectories = srcPath =>
  fs.readdirSync(srcPath)
    .filter(file => fs.lstatSync(path.join(srcPath, file)).isDirectory())

// Top-level directory for designs
const designDir = getDirectories('designs');

// Top-level directory for individual emails
const emailDir = getDirectories('emails');

// File extensions to process from MJML to HTML
const mjmlFileExt = 'mjml';

// Subdirectory of designs in which to look for Sass/CSS styles
const styleDir = 'style';

// Subdirectory of emails in which to export HTML code
const distDir = 'dist';

// Old paths (@TODO rewrite/replace in code below with new ones above.)
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



