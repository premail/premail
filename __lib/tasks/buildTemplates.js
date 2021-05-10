'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const rename = require('gulp-rename')
const path = require('path')
// const yaml = require('js-yaml')
const hb = require('gulp-hb')
// const Handlebars = require('handlebars')
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

  // Load templates
  const templates = []
  for (const template of paths.templates.array) {
    templates.push(template)
  }

  // Load partials
  const partials = []
  for (const key in paths.theme.css) {
    const partialPath = path.join(
      paths.theme.temp,
      paths.theme.sassDir,
      paths.theme.css[key]
    )
    partials.push(partialPath)
  }

  src(templates)
    .pipe(
      hb()
        .partials()
        .helpers(helpers)
        .data(config)
    )
    .on('error', e.hbError)
    .pipe(
      rename(function (path, file) {
        const subPath = file.path
          .replace(paths.current.path, '')
          .replace(path.basename, '')
          .replace(path.extname, '')
        path.dirname += subPath
        debug('Processed template file: ' + path.basename + path.extname)
      })
    )
    .pipe(dest(paths.current.temp))
    .on('end', function () {
      debug(msg.b('Created temporary files at: ') + paths.current.temp)
    })

  done()
}
