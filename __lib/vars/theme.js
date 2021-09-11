'use strict'

/* eslint-disable no-unused-vars */
const { config } = require('../vars/config.js')
/* eslint-enable no-unused-vars */

//
// Create a theme-only export for use in importing values to Sass
//

const theme = config.theme

// Because we can't access nested objects in the Sass files, we need to define
// and export each object in turn.
const page = theme.page
const colors = theme.colors
const fonts = theme.fonts
const text = theme.text.default
const links = theme.links
const typography = config.user.details.typography

module.exports = {
  page,
  colors,
  fonts,
  text,
  links,
  typography,
}
