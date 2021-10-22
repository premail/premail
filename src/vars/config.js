'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const e = require('../functions/e.js')
const projectPath = require('../functions/projectPath.js')
const getFiles = require('../functions/getFiles.js')

const { flags } = require('../vars/flags.js')
/* eslint-enable no-unused-vars */

//
// Set up configuration and path values
//

const config = {}
config.__base = projectPath(__dirname, '../../')
config.src = path.join(config.__base, 'src')
config.file = {
  user: path.join(config.__base, 'config.yaml'),
  theme: 'themeConfig.yaml',
}

// Load internal config from ./src/config/ directory.
config.file.internal = {}
config.file.internal.__dir = path.join(config.src, 'config')
config.file.internal.__list = getFiles(config.file.internal.__dir, 'yaml')

for (const setting of config.file.internal.__list) {
  const file = yaml.loadAll(fs.readFileSync(setting, { encoding: 'utf-8' }))
  Object.assign(config.file.internal, file[0])
}

// Load user config from YAML file.
const userJSON = yaml.loadAll(
  fs.readFileSync(config.file.user, { encoding: 'utf-8' })
)
config.user = userJSON[0]

// Save template filename parts.
const templateDotExt = path.extname(config.user.files.template)
config.user.files.templateExt = templateDotExt.replace('.', '')
const templateFilename = path.basename(
  config.user.files.template,
  path.extname(config.user.files.template)
)

// Set current folders based on CLI flags, if any are set.
let currentDesign = config.user.folders.design.default

if (flags.d) {
  currentDesign = flags.d
}

let currentEmail = ''

if (flags.e) {
  currentEmail = flags.e
}

// Set paths for current directories.
config.current = {
  mainTemplate: config.user.files.template,
}

if (currentEmail) {
  config.current.name = currentEmail
  config.current.path = projectPath(
    config.__base,
    config.user.folders.email.name,
    currentEmail
  )
  config.current.dist = projectPath(
    config.__base,
    config.user.folders.email.name,
    currentDesign,
    config.user.folders.output.dir
  )
} else {
  config.current.name = currentDesign
  config.current.path = projectPath(
    config.__base,
    config.user.folders.design.name,
    currentDesign
  )
  config.current.dist = projectPath(
    config.__base,
    config.user.folders.design.name,
    currentDesign,
    config.user.folders.output.dir
  )
}

// Set current theme path
config.current.theme = {
  name: config.user.folders.theme.dir,
  path: projectPath(
    config.__base,
    config.user.folders.design.name,
    currentDesign,
    config.user.folders.theme.dir
  ),
}

// Load theme config from YAML file.
const themeYAML = fs.readFileSync(
  path.join(config.current.theme.path, config.file.theme),
  {
    encoding: 'utf-8',
  }
)
const themeJSON = yaml.loadAll(themeYAML)
config.theme = themeJSON[0]

// Calculating internal-only (not included in config file) theme settings.
if (config.theme.fonts) {
  // Font stack
  config.theme.fonts.stack.first = ''

  // Web font
  config.theme.fonts.web = false
  if (
    config.theme.fonts.stack.google.enabled ||
    config.theme.fonts.stack.custom.enabled
  ) {
    config.theme.fonts.web = true
  }

  // Custom Font URI
  if (config.theme.fonts.stack.custom.enabled) {
    config.theme.fonts.stack.first = config.theme.fonts.stack.custom.name
  }

  // Google Font URI
  if (config.theme.fonts.stack.google.enabled) {
    config.theme.fonts.stack.first = config.theme.fonts.stack.google.name
    const weights = []
    let specs

    if (config.theme.fonts.stack.google.italics) {
      specs = 'ital,wght@'

      for (let weight of config.theme.fonts.stack.google.weights) {
        weight = '0,' + weight
        weights.push(weight)
      }

      for (let weight of config.theme.fonts.stack.google.weights) {
        weight = '1,' + weight
        weights.push(weight)
      }
    } else {
      specs = 'wght@'

      for (const weight of config.theme.fonts.stack.google.weights) {
        weights.push(weight)
      }
    }

    specs += weights.reduce(
      (s, x, i) => s + (i > 0 ? ';' : '') + (x == null ? '' : x),
      ''
    )

    config.theme.fonts.stack.google.href =
      "'https://fonts.googleapis.com/css2?family=" +
      config.theme.fonts.stack.google.name.replace(/\s/g, '+') +
      ':' +
      specs +
      "&amp;display=swap'"
  }
}

if (config.theme.head) {
  config.theme.head.array = ''
  for (const i of config.theme.head) {
    config.theme.head.array += i.html
  }
}

// Set current template paths
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
