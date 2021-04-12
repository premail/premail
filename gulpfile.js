'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const fs         = require('fs')
const path       = require('path');
const minimist   = require('minimist');
const rename     = require('gulp-rename');
const gulpif     = require('gulp-if');
const mjml       = require('gulp-mjml');
const mjmlEngine = require('mjml');
const prettier   = require('gulp-prettier');
const sass       = require('gulp-sass');
const Fiber      = require('fibers');
sass.compiler    = require('sass');

//
// Config
//

// Top-level directory for designs
let designDir = 'designs';

// Top-level directory for individual emails
let emailDir = 'emails';

// File extensions to process from MJML to HTML
let mjmlFileExt = '.mjml';

// Subdirectory of designs in which to look for Sass/CSS styles
let styleDir = 'style';

// Subdirectory of emails in which to export HTML code
let distDir = 'dist';

// Acquire CLI arguments
// @TODO move this to separate module.
const arg = (argList => {

  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    }
    else {

      // argument name
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  return arg;

})(process.argv);

// Set constants from CLI arguments
let designCurrent = '_templates';

if (arg.d) {
  designCurrent = arg.d;
}

let emailCurrent = '';

if (arg.e) {
  emailCurrent = arg.e;
}

let prod = false;

if (arg.prod) {
  prod = true;
}

// Set fully qualified paths
let designCurrentDir = path.resolve(__dirname, designDir, designCurrent);
let emailCurrentDir  = path.resolve(__dirname, emailDir, emailCurrent);
let designDistDir    = path.resolve('/', designDir, designCurrent, distDir);
let emailDistDir     = path.resolve('/', emailDir, emailCurrent, distDir);

// @TODO New feature that would get the list of current designs and emails
// based on directory names, and prompt the user to select one, rather than
// only relying on passing arguments via the command-line.
//
// Nice example:
// https://github.com/kraftvaerk/generator-rammevaerk/blob/master/app/index.js
//
// const prompt = require('prompt-sync')({ sigint: true });
//
// Acquire directory information
// const getDirectories = srcPath =>
//   fs.readdirSync(srcPath)
//     .filter(file => fs.lstatSync(path.join(srcPath, file)).isDirectory())
//
// Get list of designs by directory name
// const designList = getDirectories(designDir);
//
// Get list of emails by directory name
// const emailList = getDirectories(emailDir);
//
// Prompt user (example code)
// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

//
// Error handling
//

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

//
// MJML
//

// Render MJML templates into an HTML file.
function renderHTML() {

  let sourceFile;

  if (emailCurrent) {
    sourceFile = emailCurrentDir + '/index' + mjmlFileExt;
  } else {
    sourceFile = designCurrentDir + '/index' + mjmlFileExt;
  }

  let destDir;

  if (emailCurrent) {
    destDir = emailDistDir;
  } else {
    destDir = designDistDir;
  }

  // @TODO: Move these notifications to the interior of the rendering function;
  // spruce them up.
  console.log('Source:         ' + sourceFile);
  let destFile = path.resolve(__dirname, destDir, 'index.html');
  console.log('Generated HTML: ' + destFile);

  if (prod) {
    console.log('Production: Minified with HTML comments stripped.')
  }

  return src(sourceFile)
  .pipe(gulpif(prod,
    // Production
    mjml(mjmlEngine, {
      fileExt: mjmlFileExt,
      beautify: false,
      minify: true,
      keepComments: false,
    }),
    // Development
    mjml(mjmlEngine, {
      fileExt: mjmlFileExt,
      beautify: true,
    })
  ))
  .on('error', handleError)
  .pipe(
    rename(function (path) {
      path.dirname += destDir;
    })
    )
  .pipe(dest('.'))
}

//
// Prettier
//

function prettyMJML() {
  return src('./**/*' + mjmlFileExt)
    .pipe(prettier())
    .on('error', handleError)
    .pipe(dest(file => file.base))
}

function prettySass() {
  return src(designCurrentDir + '/' + styleDir + '/**/*.scss')
    .pipe(
      prettier({
        parser: "scss"
      })
    )
    .on('error', handleError)
    .pipe(dest(file => file.base))
}

//
// Sass styling
//

function sassBuild() {
  return src(designCurrentDir + '/' + styleDir + '/**/*.scss')
    .pipe(sass({
      fiber: Fiber,
      outputStyle: 'compressed',
    })
    .on('error', sass.logError))
    .pipe(dest(designCurrentDir + '/' + distDir + '/'));
}

function sassWatch() {
  watch(designCurrentDir + '/' + styleDir + '/**/*.scss', series('sass'));
}

//
// Tasks
//

// Gulp default
exports.default = series(renderHTML);

// Build HTML files
exports.build = renderHTML;
exports.build.description = "Builds HTML files from MJML templates.\n                             Options:\n                               --prod: Renders a production file, minified and with HTML comments stripped out.\n                               -d:     Specifies design folder to use. (Default: _templates)\n                               -e:     Specifies email folder to render.";

// Watch templates
function watchTemplates () {
  watch('./**/*' + mjmlFileExt, renderHTML);
}
exports.watch = watchTemplates;
exports.watch.description = "Watches and renders HTML files for development (formatted, with comments).";

// Sass compilation and watch (@TODO: Move watch into general watch function)
exports.sass = sassBuild;
exports.sass.description = "Compiles Sass files in the 'style' directory to CSS files in the 'dist' directory.";
exports.sassWatch = sassWatch;
exports.sassWatch.description = "Watches Sass files in the 'style' directory and on changes compiles to CSS files in the 'dist' directory";

// Code formatting
exports.formatMJML = prettyMJML;
exports.formatMJML.description = "Format your MJML code with Prettier.";
exports.formatSass = prettySass;
exports.formatSass.description = "Format your Sass code with Prettier.";



