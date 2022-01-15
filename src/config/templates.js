'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')

const getFiles = require.main.require('./src/helpers/getFiles')

const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { design } = require.main.require('./src/config/design')
/* eslint-enable no-unused-vars */

//
// Set current template paths
//

if (fs.existsSync(config.file.project) && fs.existsSync(config.file.design)) {
  // Save template filename parts, which are always based on templates as
  // defined in the design, even if an email is also being built.
  config.templates = {}
  config.templates.dotext = path.extname(config.design.templates.main)
  config.templates.ext = config.templates.dotext.replace('.', '')
  config.templates.mainFilename = path.basename(
    config.design.templates.main,
    path.extname(config.design.templates.main)
  )

  config.design.templates.array = getFiles(
    config.current.design.path + path.sep,
    config.templates.ext
  )

  if (config.current.email.name) {
    config.email.templates = {
      array: getFiles(
        config.current.email.path + path.sep,
        config.templates.ext
      ),
    }
  }

  // Construct paths of all templates
  config.current.templates = {}
  if (config.current.email.name) {
    config.current.templates.array = [
      ...config.design.templates.array,
      ...config.email.templates.array,
    ]
  } else {
    config.current.templates.array = [...config.design.templates.array]
  }

  config.current.templates.list = config.current.templates.array
    .toString()
    .split(',')
    .join('\n')

  // Main template is always located in the design
  config.current.templates.main = path.join(
    config.current.design.path,
    config.design.templates.main
  )

  config.current.templates.all = [
    config.current.templates.main,
    ...config.current.templates.array,
  ]

  config.current.templates.names = config.current.templates.array.map(item => {
    return path.basename(item)
  })

  // Define intermediate rendered template -- post-Handlebars, pre-MJML
  config.current.templates.int = path.join(
    config.current.dist,
    `${config.templates.mainFilename}.mjml`
  )

  // Create a container for rendered partials
  config.partials = {}
}

module.exports = {
  config,
}
