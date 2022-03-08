'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')

const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { templates } = require.main.require('./src/config/templates')
const { design } = require.main.require('./src/config/design')
const { flags } = require.main.require('./src/ops/flags')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// List paths being built or watched.
//

const paths = {}
let message = ''

function getPaths () {
  if (fs.existsSync(config.file.project)) {
    paths.configProject = path.resolve(config.file.project)
    message += `\nProject config: ${paths.configProject}`

    if (config.current.email.name) {
      paths.configEmail = path.resolve(config.file.email)
      message += `\nEmail config: ${paths.configEmail}`
    }

    if (config.current.design.name) {
      paths.configDesign = path.resolve(config.file.design)
      message += `\nDesign config:  ${paths.configDesign}`
      paths.mainTemplate = path.resolve(config.current.templates.main)
      message += `\nMain template:  ${paths.mainTemplate}`
      paths.contentDir = path.resolve(config.current.path, 'content')
      message += `\nContent dir:    ${paths.contentDir}`
      paths.structureDir = path.resolve(config.current.path, 'structure')
      message += `\nStructure dir:  ${paths.structureDir}`
      paths.themeDir = path.resolve(config.current.theme)
      message += `\nTheme dir:      ${paths.themeDir}`
    }

    notify.msg('info', message, 'Current paths:')
  }
}

module.exports = {
  paths,
  message,
  getPaths,
}
