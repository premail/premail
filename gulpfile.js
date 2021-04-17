'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const fs          = require('fs')
const path        = require('path');
const minimist    = require('minimist');
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
// Config
//

// Top-level directory for designs
let designDir = 'designs';

// Top-level directory for individual emails
let emailDir = 'emails';

// Main template file
let templateFile = 'index.tpl';

// File extensions to process from MJML to HTML
let mjmlFileExt = 'tpl';

// Subdirectory of designs in which settings for styling are kept
let themeDir = 'theme';

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

function getFiles(base,ext,files,result) {
  files = files || fs.readdirSync(base)
  result = result || []

  files.forEach(
    function (file) {
      var newbase = path.join(base,file)
      if ( fs.statSync(newbase).isDirectory() )
      {
        result = getFiles(newbase,ext,fs.readdirSync(newbase),result)
      }
      else
      {
        if ( file.substr(-1*(ext.length+1)) == '.' + ext )
        {
          result.push(newbase)
        }
      }
    }
  )
  return result
}

//
// Notifications and error handling
//

const log = console.log;

const msg = {
  error: chalk.bgRed.bold.white,
  warn: chalk.bgYellow.bold.black,
  info: chalk.bold.green,
  debug: chalk.keyword('aqua')
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
      log(msg.info('CSS file written to ' + sassDir));
    })
}

function watchSass() {
  watch(sassDir + '**/*.scss', series('buildSass'));
}

//
// Template rendering
//

// Handlebars
let templatePath = designCurrentDir + '/' + templateFile;
let templatePartials = getFiles(designCurrentDir, ('.' + mjmlFileExt));

// let templatePartials = srcPath =>
//   fs.readdirSync(srcPath)
//     .filter(file => fs.lstatSync(path.join(templatePath, file)));

// for(let partial of templatePartials){
//   Handlebars.registerPartial(partial, fs.readFileSync(templatePartials, 'utf8'));
// }

async function listTemplates() {
  let partialList = templatePartials.toString().split(',').join('\n');
  log(msg.debug(templatePath));
  log(msg.debug(partialList));
}

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
    destDir = emailDistDir;
  } else {
    destDir = designDistDir;
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
    log(msg.info('Source:         ' + sourceFile));
  })
  .on('error', handleError)
  .pipe(
    rename(function (path) {
      path.dirname += destDir;
    })
    )
  .pipe(dest('.'))
  .on('finish', function(source) {
    log(msg.info('Generated HTML: ' + destFile));
    if (prod) {
      log(msg.info('Production: Minified with HTML comments stripped.'));
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
