'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')

const getFiles = require('../functions/getFiles.js')

const { config } = require('../vars/config.js')
/* eslint-enable no-unused-vars */

//
// Set current template paths
//

// Save template filename parts.
const templateDotExt = path.extname(config.user.files.template)
config.user.files.templateExt = templateDotExt.replace('.', '')
const templateFilename = path.basename(
  config.user.files.template,
  path.extname(config.user.files.template)
)

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
config.current.templates.all = [
  config.current.templates.main,
  ...config.current.templates.array,
]

// Define intermediate rendered template -- post-Handlebars, pre-MJML
config.current.templates.int = path.join(
  config.current.dist,
  `${templateFilename}.mjml`
)

// Create a container for rendered partials
config.partials = {}

module.exports = {
  config,
}
