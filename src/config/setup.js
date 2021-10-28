'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const projectPath = require('../helpers/projectPath.js')
const getFiles = require('../helpers/getFiles.js')
/* eslint-enable no-unused-vars */

//
// Set up internal configuration
//

const config = {}
config.__base = projectPath(__dirname, '../../')
config.src = path.join(config.__base, 'src')
config.init = path.join(config.src, 'example')
config.file = {}
config.file.internal = {}
config.file.internal.__dir = path.join(config.src, 'settings')
config.file.internal.__list = getFiles(config.file.internal.__dir, 'yaml')

for (const setting of config.file.internal.__list) {
  const file = yaml.loadAll(fs.readFileSync(setting, { encoding: 'utf-8' }))
  Object.assign(config.file.internal, file[0])
}

config.file.init = path.join(config.file.internal.__dir, 'init.yaml')

module.exports = {
  config,
}
