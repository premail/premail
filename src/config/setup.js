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

// Initial project scaffolding
config.init = {}
config.init.path = path.join(config.src, 'scaffolding', 'project')
config.init.readme = path.join(config.__base, '..', '..', 'README.md')

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
