'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const { config } = require('../config/setup.js')
const { current } = require('../config/current.js')
const { theme } = require('../config/theme.js')
/* eslint-enable no-unused-vars */

//
// Prepare theme settings for Sass import
//

if (
  fs.existsSync(config.file.user) &&
  fs.existsSync(config.current.theme.file)
) {
  // Because we can't access nested objects in the Sass files, we need to define
  // and export each object in turn.
  const page = config.theme.page
  const colors = config.theme.colors
  const fonts = config.theme.fonts
  const text = config.theme.text.default
  const links = config.theme.links
  const lists = config.theme.lists
  const signoff = config.theme.signoff
  const typography = config.user.details.typography

  module.exports = {
    page,
    colors,
    fonts,
    text,
    links,
    lists,
    signoff,
    typography,
  }
}
