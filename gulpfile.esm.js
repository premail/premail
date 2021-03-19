'use strict';

import {
    src,
    dest,
    series,
    parallel,
    watch
} from 'gulp';

import * as Config from './_lib/gulp/config.js';
import * as MJML from './_lib/gulp/mjml.js';
import * as Prettier from './_lib/gulp/prettier.js';

// Gulp default
exports.default = compileTemplates;

// Compile templates for development
function compileTemplates(done) {
  return parallel(MJML.htmlPretty)(done);
}
exports.compileTemplates = compileTemplates;

// Build templates for production
function buildTemplates(done) {
  return parallel(MJML.htmlProd)(done);
}
exports.buildTemplates = buildTemplates;

// Watch templates
function watchTemplates () {
  watch('./**/*.mjml', MJML.htmlPretty);
}
exports.watchTemplates = watchTemplates

// Pretty MJML files
function prettyMJML(done) {
  return parallel(Prettier.mjml)(done);
}
exports.prettyMJML = prettyMJML;
