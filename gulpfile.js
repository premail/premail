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

// @TODO consider replacing this with prompt based on existing directories
// (see getDirectories, below).
//
// const prompt     = require('prompt-sync')({ sigint: true });
// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

// Acquire directory information
const getDirectories = srcPath =>
  fs.readdirSync(srcPath)
    .filter(file => fs.lstatSync(path.join(srcPath, file)).isDirectory())

// Get list of designs by directory name
const designList = getDirectories(designDir);

// Get list of emails by directory name
const emailList = getDirectories(emailDir);

// Set fully qualified paths
let designCurrentDir = path.resolve(__dirname, designDir, designCurrent);
let emailCurrentDir = path.resolve(__dirname, emailDir, emailCurrent);
let designDistDir = path.resolve('/', designDir, designCurrent, distDir);
let emailDistDir = path.resolve('/', emailDir, emailCurrent, distDir);

// Old paths (@TODO rewrite/replace in code below with new ones above.)
const paths = {
  dist: path.resolve('/dist/'),
  srcMJML: path.resolve('./', '**/index.mjml'),
  destMJML: path.resolve('.'),
  srcPrettier: path.resolve('./', '**/*.mjml'),
  destPrettier: path.resolve('.')
}

//
// Error handling
//

function handleError (err) {
  console.log(err.toString());
  this.emit('end');
}

//
// MJML
//

// MJML -> HTML
function htmlMJML() {

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
    console.log('Production: Minified with comments stripped.')
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
exports.build = htmlMJML;

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



