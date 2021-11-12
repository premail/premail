'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')

const getFiles = require('../helpers/getFiles.js')

const { config } = require('../config/setup.js')
const { current } = require('../config/current.js')
const { design } = require('../config/design.js')
/* eslint-enable no-unused-vars */

//
// Set current template paths
//

if (fs.existsSync(config.file.project) && fs.existsSync(config.file.design)) {
  // Save template filename parts.
  config.design.templates.dotext = path.extname(config.design.templates.main)
  config.design.templates.ext = config.design.templates.dotext.replace('.', '')
  config.design.templates.mainFilename = path.basename(
    config.design.templates.main,
    path.extname(config.design.templates.main)
  )

  // Construct paths of all templates
  config.current.templates = {}

  config.current.templates.array = getFiles(
    config.current.path + path.sep,
    config.design.templates.ext
  )
  config.current.templates.list = config.current.templates.array
    .toString()
    .split(',')
    .join('\n')
  config.current.templates.main = path.join(
    config.current.design.path,
    config.design.templates.main
  )
  config.current.templates.all = [
    config.current.templates.main,
    ...config.current.templates.array,
  ]

  const designTemplates = getFiles(
    config.current.design.path + path.sep,
    config.design.templates.ext
  )

  config.current.templates.design = designTemplates.map(item => {
    return path.basename(item)
  })

  // Define intermediate rendered template -- post-Handlebars, pre-MJML
  config.current.templates.int = path.join(
    config.current.dist,
    `${config.design.templates.mainFilename}.mjml`
  )

  // Create a container for rendered partials
  config.partials = {}
}

module.exports = {
  config,
}
