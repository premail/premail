'use strict'

/* eslint-disable no-unused-vars */
const path = require('path')

const { userConfig } = require('../functions/userConfig.js')
const { arg } = require('../functions/arg.js')
const projectPath = require('../functions/projectPath.js')
const getFiles = require('../functions/getFiles.js')
/* eslint-enable no-unused-vars */

//
// Construct fully-qualified paths based on CLI arguments, if any.
//

// Get arguments from command line
let currentDesign = userConfig.data.folders.design.default

if (arg.d) {
  currentDesign = arg.d
}

let currentEmail = ''

if (arg.e) {
  currentEmail = arg.e
}

// Set fully qualified paths
const __base = projectPath(__dirname, '../../')
const __temp = '/.tmp/'

const design = {
  name: currentDesign,
  path: projectPath(__base, userConfig.data.folders.design.name, currentDesign),
  file: 'index.' + userConfig.data.files.mjml.ext,
  dist: projectPath(
    __base,
    userConfig.data.folders.design.name,
    currentDesign,
    userConfig.data.folders.output.dir
  ),
  temp: __temp,
}

const email = {
  name: currentEmail,
  path: projectPath(__base, userConfig.data.folders.email.name, currentEmail),
  file: 'index.' + userConfig.data.files.mjml.ext,
  dist: projectPath(
    __base,
    userConfig.data.folders.email.name,
    currentEmail,
    userConfig.data.folders.output.dir
  ),
  temp: __temp,
}

const theme = {
  name: userConfig.data.folders.theme.dir,
  path: projectPath(
    __base,
    userConfig.data.folders.design.name,
    currentDesign,
    userConfig.data.folders.theme.dir
  ),
  sassDir: '/sass',
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
// const designList = getDirectories(userConfig.data.folders.design.path);
//
// Get list of emails by directory name
// const emailList = getDirectories(userConfig.data.folders.email.name);
//
// Prompt user (example code)
// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

const templates = {
  path: design.path + '/',
}

templates.array = getFiles(templates.path, userConfig.data.files.mjml.ext)
templates.list = templates.array
  .toString()
  .split(',')
  .join('\n')
templates.main = templates.path + userConfig.data.files.template
templates.partials = templates.array
  .filter(function (value) {
    return value !== templates.main
  })
  .toString()
  .split(',')
  .join('\n')

module.exports = {
  design,
  email,
  theme,
  templates,
}
