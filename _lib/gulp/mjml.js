'use strict';

import {
    src,
    dest
} from 'gulp';

const rename = require('gulp-rename')
const mjml = require('gulp-mjml')
const mjmlEngine = require('mjml')

import path from 'path';
import * as Config from './config.js';

// MJML -> HTML: Development version (pretty-formatted, with comments)
export function htmlDev() {
  return src(Config.paths.srcMJML)
  .pipe(
    mjml(mjmlEngine, {
      beautify: true,
    })
    )
  .on('error', (e) => console.log(e))
  .pipe(
    rename(function (path) {
      path.dirname += Config.paths.dist;
    })
    )
  .pipe(dest(Config.paths.destMJML))
}

// MJML -> HTML: Production version (minified, no comments)
export function htmlProd() {
  return src(Config.paths.srcMJML)
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
      path.dirname += Config.paths.dist;
    })
    )
    .pipe(dest(Config.paths.destMJML))
}
