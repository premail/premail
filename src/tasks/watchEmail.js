'use strict'

/* eslint-disable no-unused-vars */
const { watch, series, parallel } = require('gulp')
const path = require('path')
// https://www.npmjs.com/package/gulp-changed

const { config } = require('../config/setup.js')
const e = require('../ops/errors.js')
const notify = require('../ops/notifications.js')
const build = require('../tasks/build.js')
/* eslint-enable no-unused-vars */

//
// Watch design and configuration files and rebuild as necessary.
//

module.exports = function watchEmail (done) {
  notify.watch('watching')

  const paths = {
    configProject: config.file.project,
    configDesign: config.current.design.path + path.sep + config.file.design,
    style: config.current.design.path + '/**/*.scss',
    template: config.current.path + '/**/*.' + config.design.templates.ext,
    partials: config.current.path + '/**/*.mjml',
    html: config.current.path + '/**/*.html',
  }

  notify.msg(
    'debug',
    `\nProject config: ${paths.configProject}\nDesign config: ${paths.configDesign}\nStyles:       ${paths.style}\nTemplate:    ${paths.template}\nPartials:     ${paths.partials}\nHTML:         ${paths.html}`,
    'Watching these paths:'
  )

  // Trigger email rebuild.
  watch(
    [
      paths.configProject,
      paths.configDesign,
      paths.style,
      paths.template,
      paths.partials,
    ],
    function styleRebuild (done) {
      build.styles()
      build.content()
      build.render()
      done()
    }
  )
}
