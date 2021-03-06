'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const projectPath = require.main.require('./src/helpers/projectPath')
const getFiles = require.main.require('./src/helpers/getFiles')
/* eslint-enable no-unused-vars */

//
// Set up internal configuration
//

const config = {}
config.__base = projectPath(__dirname)
config.src = path.join(config.__base, '..', '..', 'src')

// Scaffolding
config.scaf = {}
config.scaf.__dir = path.join(config.src, 'scaffolding')
config.scaf.init = path.join(config.scaf.__dir, 'project')
config.scaf.readme = path.join(config.__base, '..', '..', 'README.md')
config.scaf.email = path.join(config.scaf.__dir, 'email')

// Internal settings
config.file = {}
config.file.internal = {}
config.file.internal.__dir = path.join(config.src, 'settings')
config.file.internal.__list = getFiles(config.file.internal.__dir, 'yaml')

for (const setting of config.file.internal.__list) {
  const file = yaml.loadAll(fs.readFileSync(setting, { encoding: 'utf-8' }))
  Object.assign(config.file.internal, file[0])
}

module.exports = {
  config,
}
