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

const err = require('../functions/err.js')
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

  // Define template location
  let templatePath

  if (paths.email.name) {
    templatePath = paths.email.path
  } else {
    templatePath = paths.design.path
  }

  // Establish temporary directory.
  let tempDir

  if (paths.email.name) {
    tempDir = paths.email.path + paths.email.temp
  } else {
    tempDir = paths.design.path + paths.design.temp
  }

  // Load all templates
  const templateArray = []

  for (const template of paths.templates.array) {
    templateArray.push(template)
  }

  const cssInlineFile =
    paths.theme.path + paths.theme.sassDir + '/' + config.internal.css.inline

  fs.stat(cssInlineFile, function (err, stat) {
    if (err == null) {
      // Register Handlebars partials
      const cssInline = fs.readFileSync(cssInlineFile, 'utf8')
      Handlebars.registerPartial('cssInline', cssInline)

      for (const file of templateArray) {
        // Create new template
        const template = fs.readFileSync(file, 'utf8')
        const format = Handlebars.compile(template, {
          strict: true,
        })

        // Use configuration settings as data in the templates
        const processedTemplate = format(config)

        // Write the processed template
        // @TODO: Ensure this doesn't keep creating `.tmp` subdirectories of one
        // another ad nauseum.
        const destPath =
          tempDir +
          path.relative(templatePath, file).replace(path.basename(file), '')

        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true })
        }

        fs.writeFileSync(
          destPath + '/' + path.basename(file),
          processedTemplate
        )

        debug('Processed template file: ' + path.basename(file))
      }

      debug(
        msg.b('Created temporary files at: ') +
          paths.design.path +
          paths.design.temp
      )
    } else if (err.code === 'ENOENT') {
      log(
        msg.error(
          'Error building template files: CSS files do not exist. Run `gulp buildStyles` before running this task.'
        )
      )
    } else {
      log(msg.error('Error: ' + err.code))
    }
  })

  done()
}
