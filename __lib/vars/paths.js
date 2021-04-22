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
let currentDesign = config.folders.design.default;

if (arg.d) {
  currentDesign = arg.d;
}

let currentEmail = '';

if (arg.e) {
  currentEmail = arg.e;
}

// Set fully qualified paths
let __base = projectPath(__dirname, '../../');

let design = {
  name: currentDesign,
  path: projectPath(__base, config.folders.design.name, currentDesign),
  dist: projectPath(__base, config.folders.design.name, currentDesign, config.folders.output.dir)
}

let email = {
  name: currentEmail,
  path: projectPath(__base, config.folders.email.name, currentEmail),
  dist: projectPath(__base, config.folders.email.name, currentEmail, config.folders.output.dir)
}

let theme = {
  name: config.folders.theme.dir,
  path: projectPath(__base, config.folders.design.name, currentDesign, config.folders.theme.dir)
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
// const designList = getDirectories(config.folders.design.path);
//
// Get list of emails by directory name
// const emailList = getDirectories(config.folders.email.name);
//
// Prompt user (example code)
// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

let templateFile = design.path + '/' + config.files.template;
let partialsDir  = getFiles(design.path, config.files.mjml.ext);
let partialsList =
    partialsDir
    .filter(function(value){
        return value !== templateFile;
    })
    .toString()
    .split(',')
    .join('\n');

let templates = {
  main: templateFile,
  partials: {
    dir: partialsDir,
    list: partialsList
  }
}

module.exports = {
  design,
  email,
  theme,
  templates
};
