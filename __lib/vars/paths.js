'use strict';

const path = require('path');

const { config } = require('../functions/config.js');
const { arg }    = require('../functions/arg.js');
const getFiles   = require('../functions/getFiles.js');

//
// Construct fully-qualified paths based on CLI arguments, if any.
//

// Get arguments from command line
let designCurrent = config.paths.design.default;

if (arg.d) {
  designCurrent = arg.d;
}

let emailCurrent = '';

if (arg.e) {
  emailCurrent = arg.e;
}

// Set fully qualified paths
// @TODO: Clean up this mess with the 'projectPath' function in this directory.
let designCurrentDir = path.resolve(__dirname, '../', config.paths.design.dir, designCurrent);
let emailCurrentDir  = path.resolve(__dirname, '../', config.paths.email.dir, emailCurrent);
let designDistDir    = path.resolve(__dirname, '../', config.paths.design.dir, designCurrent, config.paths.output.dir);
let emailDistDir     = path.resolve(__dirname, '../', config.paths.email.dir, emailCurrent, config.paths.output.dir);
let sassDir          = designCurrentDir + '/' + config.paths.theme.dir + '/sass/';

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
// const designList = getDirectories(config.paths.design.dir);
//
// Get list of emails by directory name
// const emailList = getDirectories(config.paths.email.dir);
//
// Prompt user (example code)
// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

let templateFile = designCurrentDir + '/' + config.files.template;
let templatePartials = getFiles(designCurrentDir, config.files.mjml.ext);

module.exports = {
  designCurrent,
  emailCurrent,
  designCurrentDir,
  emailCurrentDir,
  designDistDir,
  emailDistDir,
  sassDir,
  templateFile,
  templatePartials
};
