'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const fs          = require('fs');
const path        = require('path');
const del         = require('del');
const PluginError = require('plugin-error');
const chalk       = require('chalk');
const Handlebars  = require("handlebars");
const rename      = require('gulp-rename');
const gulpif      = require('gulp-if');
const mjml        = require('gulp-mjml');
const mjmlEngine  = require('mjml');
const prettier    = require('gulp-prettier');
const sass        = require('gulp-sass');
const Fiber       = require('fibers');
sass.compiler     = require('sass');

//
// File includes
//

const { arg } = require('./functions/arg.js');
const { log } = require('./functions/log.js');
const paths = require('./paths.js');

//
// Config
//

function test(done) {
  console.log(paths.designDir);
  done();
}
exports.test = test;

// Top-level directory for designs
let designDir = '../designs';

// Top-level directory for individual emails
let emailDir = '../emails';

// Main template file
let templateFile = 'index.tpl';

// File extensions to process from MJML to HTML
let mjmlFileExt = 'tpl';

// Subdirectory of designs in which settings for styling are kept
let themeDir = 'theme';

// Subdirectory of emails in which to export HTML code
let distDir = 'dist';

// Set constants from CLI arguments
let designCurrent = '_templates';

if (arg.d) {
  designCurrent = arg.d;
}

let emailCurrent = '';

if (arg.e) {
  emailCurrent = arg.e;
}

// Note 'debug' is set in the notifications and error handling section.

let prod = false;

if (arg.prod) {
  prod = true;
}

// Set fully qualified paths
let designCurrentDir = path.resolve(__dirname, designDir, designCurrent);
let emailCurrentDir  = path.resolve(__dirname, emailDir, emailCurrent);
let designDistDir    = path.resolve(__dirname, designDir, designCurrent, distDir);
let emailDistDir     = path.resolve(__dirname, emailDir, emailCurrent, distDir);
let sassDir          = designCurrentDir + '/' + themeDir + '/sass/';

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

const { getFiles } = require('./functions/getFiles.js');

//
// Notifications and error handling
//

const msg = {
  error: chalk.bgRed.bold.white,
  warn:  chalk.bgYellow.black,
  info:  chalk.green,
  debug: chalk.keyword('aqua'),
  b:     chalk.bold
}

let debug = function () { return '' };

if (arg.debug) {
  debug = msg.debug;
}

function handleError(err) {
  log(msg.error(err));
  this.emit('end');
}

// Sprucing up sass.logError
const sassError = function logError(error) {
  const message = new PluginError('gulp-sass', error.messageFormatted).toString();
  log(msg.error('\nSass processing error'));
  log(`${message}\n`);
  this.emit('end');
};

//
// Directory and file cleaning
//

function clean(done) {
  log(msg.warn('Deleting generated files...'))

  const deletedFilePaths = del.sync([
    designDistDir + '/*',
    sassDir + '*.css'
  ]);

  log(debug(deletedFilePaths.join('\n')));

  done();
}


//
// Sass building
//

function buildSass() {
  return src(sassDir + '**/*.scss')
    .pipe(sass({
      fiber: Fiber,
      outputStyle: 'compressed',
    })
    .on('error', sassError))
    .pipe(dest(sassDir))
    .on('finish', function(source) {
      log(debug(msg.b('CSS file written to:\n') + sassDir));
    })
}

function watchSass() {
  watch(sassDir + '**/*.scss', series('buildSass'));
}

//
// Template rendering
//

let templatePath = designCurrentDir + '/' + templateFile;
let templatePartials = getFiles(designCurrentDir, ('.' + mjmlFileExt));

async function listTemplates() {
  let partialList = templatePartials.toString().split(',').join('\n');
  log(msg.debug(msg.b('Main template file:\n') + templatePath + '\n'));
  log(msg.debug(msg.b('Partials:\n') + partialList));
}

// Handlebars
for(let partial of templatePartials){
  Handlebars.registerPartial(partial, fs.readFileSync(templatePartials, 'utf8'));
}

// function formatTemplates() {
//   return src('./**/*.' + mjmlFileExt)
//     .pipe(prettier({
//         parser: "html"
//       }))
//     .on('error', handleError)
//     .pipe(dest(file => file.base))
//     .on('finish', function(source) {
//       log(msg.info('All .' + mjmlFileExt + ' templates reformatted.'));
//     })
// }

//
// MJML
//

// Render MJML templates into an HTML file.
function buildTemplates() {

  let sourceFile;

  if (emailCurrent) {
    sourceFile = emailCurrentDir + '/index.' + mjmlFileExt;
  } else {
    sourceFile = designCurrentDir + '/index.' + mjmlFileExt;
  }

  let destDir;

  if (emailCurrent) {
    destDir = path.resolve('/', emailDir, emailCurrent, distDir);
  } else {
    destDir = path.resolve('/', designDir, designCurrent, distDir);
  }

  let destFile = path.resolve(__dirname, destDir, 'index.html');

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
  .on('finish', function(source) {
    log(debug(msg.b('Source:\n') + sourceFile));
  })
  .on('error', handleError)
  .pipe(
    rename(function (path) {
      path.dirname += destDir;
    })
    )
  .pipe(dest('.'))
  .on('finish', function(source) {
    log(msg.info(msg.b('Generated HTML:\n') + designDistDir + '/index.html'));
    if (prod) {
      log(msg.info(msg.b('Production:') + ' Minified with HTML comments stripped.'));
    }
  })
}

function watchTemplates () {
  watch('./**/*' + mjmlFileExt, buildTemplates);
}

//
// Prettier
//

function formatTemplates() {
  return src('./**/*.' + mjmlFileExt)
    .pipe(prettier({
        parser: "html"
      }))
    .on('error', handleError)
    .pipe(dest(file => file.base))
    .on('finish', function(source) {
      log(msg.info('All .' + mjmlFileExt + ' templates reformatted.'));
    })
}

function formatSass() {
  return src(sassDir + '**/*.scss')
    .pipe(
      prettier({
        parser: "scss"
      })
    )
    .on('error', handleError)
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
