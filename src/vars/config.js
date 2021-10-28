'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const e = require('../functions/e.js')
const projectPath = require('../functions/projectPath.js')
const getFiles = require('../functions/getFiles.js')

const { flags } = require('../vars/flags.js')
/* eslint-enable no-unused-vars */

//
// Set up configuration and path values
//

const config = {}
config.__base = projectPath(__dirname, '../../')
config.src = path.join(config.__base, 'src')
config.init = path.join(config.src, 'example')
config.file = {
  user: path.join(config.init, 'config.yaml'),
  theme: 'themeConfig.yaml',
}

// Load internal config from ./src/config/ directory.
config.file.internal = {}
config.file.internal.__dir = path.join(config.src, 'config')
config.file.internal.__list = getFiles(config.file.internal.__dir, 'yaml')

for (const setting of config.file.internal.__list) {
  const file = yaml.loadAll(fs.readFileSync(setting, { encoding: 'utf-8' }))
  Object.assign(config.file.internal, file[0])
}

// Load user config from YAML file.
const userJSON = yaml.loadAll(
  fs.readFileSync(config.file.user, { encoding: 'utf-8' })
)
config.user = userJSON[0]

// Set current folders based on CLI flags, if any are set.
let currentDesign = config.user.folders.design.default

if (flags.d) {
  currentDesign = flags.d
}

let currentEmail = ''

if (flags.e) {
  currentEmail = flags.e
}

// Set paths for current directories.
config.current = {
  mainTemplate: config.user.files.template,
}

if (currentEmail) {
  config.current.name = currentEmail
  config.current.path = projectPath(
    config.__base,
    config.user.folders.email.name,
    currentEmail
  )
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
  config.current.dist = projectPath(
    config.__base,
    config.user.folders.design.name,
    currentDesign,
    config.user.folders.output.dir
  )
}

// Set current theme path
// @TODO This likely needs to be moved once different themes can be defined.
config.current.theme = {
  name: config.user.folders.theme.dir,
  path: projectPath(
    config.__base,
    config.user.folders.design.name,
    currentDesign,
    config.user.folders.theme.dir
  ),
}

module.exports = {
  config,
}
