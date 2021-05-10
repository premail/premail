'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const Handlebars = require('handlebars')
const helpers = require('handlebars-helpers')(['comparison'])

const { internalConfig } = require('../functions/internalConfig.js')
const { userConfig } = require('../functions/userConfig.js')
const { themeConfig } = require('../functions/themeConfig.js')

const e = require('../functions/e.js')
const paths = require('../vars/paths.js')
const getFiles = require('../functions/getFiles.js')
const projectPath = require('../functions/projectPath.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Render Handlebars templates into HTML.
//

module.exports = function buildTemplates (done) {
  // Acquire configuration data and combine it into one object
  const config = {}
  config.internal = internalConfig.data
  config.user = userConfig.data
  config.theme = themeConfig.data

  // Load all templates
  const templateArray = []

  for (const template of paths.templates.array) {
    templateArray.push(template)
  }

  // Register Handlebars partials based on CSS config
  for (const key in paths.theme.css) {
    const partialName = 'css' + key.charAt(0).toUpperCase() + key.slice(1)
    const partialPath = path.join(
      paths.theme.temp,
      paths.theme.sassDir,
      paths.theme.css[key]
    )
    if (fs.existsSync(partialPath)) {
      const partialFile = fs.readFileSync(partialPath, 'utf8')
      Handlebars.registerPartial(`${partialName}`, partialFile)
    }
  }

  fs.stat(templateArray[0], function (error, stat) {
    if (error == null) {
      for (const file of templateArray) {
        // Create new template
        const template = fs.readFileSync(file, 'utf8')
        const format = Handlebars.compile(template, {
          strict: true,
        })

        // Use configuration settings as data in the templates
        const processedTemplate = format(config)

        // Extract subfolder data from file path
        const subFolder = path
          .dirname(file)
          .replace(paths.current.path, '')
          .replace('/.tmp', '')

        // Determine the destination
        const destPath = path.join(
          paths.current.temp,
          subFolder,
          path.basename(file)
        )

        // Create the parent directory, if necessary
        if (!fs.existsSync(path.dirname(destPath))) {
          fs.mkdirSync(path.dirname(destPath), { recursive: true })
        }

        // Write the file
        fs.writeFileSync(destPath, processedTemplate)

        debug('Processed template file: ' + path.basename(file))
      }

      debug(msg.b('Created temporary files at: ') + paths.templates.temp)
    } else if (error.code === 'ENOENT') {
      log(
        msg.error(
          'Error building template files: CSS files do not exist. Run `gulp buildStyles` before running this task.'
        )
      )
    } else {
      log(msg.error('Error: ' + error.code))
    }
  })

  done()
}
