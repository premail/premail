'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { design } = require.main.require('./src/config/design')
/* eslint-enable no-unused-vars */

//
// Prepare design settings for Sass import
//

if (fs.existsSync(config.file.project) && fs.existsSync(config.file.design)) {
  // Because we can't access nested objects in the Sass files, we need to define
  // and export each object in turn.
  const page = config.design.page
  const colors = config.design.colors
  const fonts = config.design.fonts
  const text = config.design.text.default
  const html = config.design.text.html
  const links = config.design.links
  const lists = config.design.lists
  const signoff = config.design.signoff
  const typography = config.design.typography

  module.exports = {
    page,
    colors,
    fonts,
    text,
    html,
    links,
    lists,
    signoff,
    typography,
  }
}
