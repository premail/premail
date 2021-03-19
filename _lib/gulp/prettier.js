'use strict';

import {
    src,
    dest
} from 'gulp';

import rename from 'gulp-rename';
import prettier from 'gulp-prettier';

import * as Config from './config.js';

// Prettier MJML files
export function mjml() {
  return src(Config.paths.srcPrettier)
    .pipe(prettier())
    .on('error', (e) => console.log(e))
    .pipe(dest(Config.paths.destPrettier))
}
