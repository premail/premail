'use strict';

const path = require('path');

const { config }  = require('../functions/config.js');
const { arg }     = require('../functions/arg.js');
const projectPath = require('../functions/projectPath.js');
const getFiles    = require('../functions/getFiles.js');

//
// Construct fully-qualified paths based on CLI arguments, if any.
//

// Get arguments from command line
let currentDesign = config.data.folders.design.default;

if (arg.d) {
  currentDesign = arg.d;
}

let currentEmail = '';

if (arg.e) {
  currentEmail = arg.e;
}

// Set fully qualified paths
let __base = projectPath(__dirname, '../../');
let __lib = projectPath(__base, '__lib/');

let settings = {
  path: projectPath(__lib, 'settings'),
  ext:  'yaml'
}

let design = {
  name: currentDesign,
  path: projectPath(__base, config.data.folders.design.name, currentDesign),
  file: '/index.' + config.data.files.mjml.ext,
  dist: projectPath(__base, config.data.folders.design.name, currentDesign, config.data.folders.output.dir)
}

let email = {
  name: currentEmail,
  path: projectPath(__base, config.data.folders.email.name, currentEmail),
  file: '/index.' + config.data.files.mjml.ext,
  dist: projectPath(__base, config.data.folders.email.name, currentEmail, config.data.folders.output.dir)
}

let theme = {
  name: config.data.folders.theme.dir,
  path: projectPath(__base, config.data.folders.design.name, currentDesign, config.data.folders.theme.dir),
  sassDir: '/sass'
}

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
// const designList = getDirectories(config.data.folders.design.path);
//
// Get list of emails by directory name
// const emailList = getDirectories(config.data.folders.email.name);
//
// Prompt user (example code)
// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

let templates = {
  path: design.path + '/'
}

templates.array = getFiles(templates.path, config.data.files.mjml.ext);
templates.list = templates.array.toString().split(',').join('\n');
templates.main = templates.path + config.data.files.template;
templates.partials = templates.array
    .filter(function(value){
      return value !== templates.main;
    })
    .toString().split(',').join('\n');

module.exports = {
  settings,
  design,
  email,
  theme,
  templates
};
