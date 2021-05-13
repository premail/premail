'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const { arg } = require('../functions/arg.js')
const projectPath = require('../functions/projectPath.js')
const getFiles = require('../functions/getFiles.js')

const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Set up configuration and path values
//

const config = {}
config.__base = projectPath(__dirname, '../../')
config.__lib = path.join(config.__base, '__lib')
config.__temp = '/.tmp'

// Load internal config from ./__lib/config/ directory.
config.internal = {}
config.internal.__dir = path.join(config.__lib, 'config')
config.internal.__list = getFiles(config.internal.__dir, 'yaml')

for (const setting of config.internal.__list) {
  const file = yaml.loadAll(fs.readFileSync(setting, { encoding: 'utf-8' }))
  Object.assign(config.internal, file[0])
}

// Load user config from YAML file.
const userJSON = yaml.loadAll(
  fs.readFileSync('./config.yaml', { encoding: 'utf-8' })
)
config.user = userJSON[0]

// Set template extension.
const templateDotExt = path.extname(config.user.files.template)
config.user.files.templateExt = templateDotExt.replace('.', '')

// Get arguments from command line
let currentDesign = config.user.folders.design.default

if (arg.d) {
  currentDesign = arg.d
}

let currentEmail = ''

if (arg.e) {
  currentEmail = arg.e
}

// Set paths for current directories.
config.current = {
  mainTemplate: config.user.files.template,
  emailTemp: path.join(
    config.__base,
    config.user.folders.email.name,
    currentEmail,
    config.__temp
  ),
  designTemp: path.join(
    config.__base,
    config.user.folders.design.name,
    currentDesign,
    config.__temp
  ),
}

if (currentEmail) {
  config.current.name = currentEmail
  config.current.path = projectPath(
    config.__base,
    config.user.folders.email.name,
    currentEmail
  )
  config.current.temp = config.current.emailTemp
  config.current.dist = projectPath(
    config.__base,
    config.user.folders.email.name,
    currentDesign,
    config.user.folders.output.dir
  )
} else {
  config.current.name = currentDesign
  config.current.path = projectPath(
    config.__base,
    config.user.folders.design.name,
    currentDesign
  )
  config.current.temp = config.current.designTemp
  config.current.dist = projectPath(
    config.__base,
    config.user.folders.design.name,
    currentDesign,
    config.user.folders.output.dir
  )
}

// Set current theme path
config.current.theme = {
  name: config.user.folders.theme.dir,
  path: projectPath(
    config.__base,
    config.user.folders.design.name,
    currentDesign,
    config.user.folders.theme.dir
  ),
  temp: path.join(
    config.__base,
    config.user.folders.design.name,
    currentDesign,
    config.__temp,
    config.user.folders.theme.dir
  ),
  sassDir: '/sass',
  css: Object.assign(config.internal.css),
}

// Load theme config from YAML file.
const themeJSON = yaml.loadAll(
  fs.readFileSync(path.join(config.current.theme.path, 'themeConfig.yaml'), {
    encoding: 'utf-8',
  })
)
config.theme = themeJSON[0]

// Create temporary JSON file of theme config
fs.mkdirsSync(config.current.theme.temp)
const themeConfig = path.join(config.current.theme.temp, 'themeConfig.json')
fs.writeFileSync(themeConfig, JSON.stringify(config.theme, null, 2))

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
// const designList = getDirectories(config.user.folders.design.path);
//
// Get list of emails by directory name
// const emailList = getDirectories(config.user.folders.email.name);
//
// Prompt user (example code)
// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

// Set current template paths
config.current.templates = {}

config.current.templates.array = getFiles(
  config.current.path + path.sep,
  config.user.files.templateExt
)
config.current.templates.list = config.current.templates.array
  .toString()
  .split(',')
  .join('\n')
config.current.templates.main = path.join(
  config.current.path,
  config.current.mainTemplate
)
config.current.templates.partials = config.current.templates.array
  .filter(function (value) {
    return value !== config.current.templates.main
  })
  .toString()
  .split(',')
  .join('\n')

// Create temporary JSON file of config data
fs.mkdirsSync(config.current.temp)
config.json = path.join(config.current.temp, 'config.json')
fs.writeFileSync(config.json, JSON.stringify(config, null, 2))
debug(msg.b('Configuration written to temporary file:\n') + config.json)

module.exports = {
  config,
}
