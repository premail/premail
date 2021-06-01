'use strict'

/* eslint-disable no-unused-vars */
const { watch, series, parallel } = require('gulp')
const path = require('path')
// https://www.npmjs.com/package/gulp-changed

const { config } = require('../vars/config.js')
const e = require('../functions/e.js')
const notify = require('../vars/notify.js')
const build = require('../tasks/build.js')
/* eslint-enable no-unused-vars */

//
// Watch design and configuration files and rebuild as necessary.
//

module.exports = function watchEmail (done) {
  notify.watch('watching')

  const paths = {
    configBuild: config.file.user,
    configTheme: config.current.theme.path + path.sep + config.file.theme,
    style: config.current.theme.path + '/**/*.scss',
    template: config.current.path + '/**/*.' + config.user.files.templateExt,
    partials: config.current.path + '/**/*.mjml',
    html: config.current.path + '/**/*.html',
  }

  notify.msg(
    'debug',
    `\nBuild config: ${paths.configBuild}\nTheme config: ${paths.configTheme}\nStyles:       ${paths.style}\nTemplate:    ${paths.template}\nPartials:     ${paths.partials}\nHTML:         ${paths.html}`,
    'Watching these paths:'
  )

  // Trigger email rebuild.
  watch(
    [
      paths.configBuild,
      paths.configTheme,
      paths.style,
      paths.template,
      paths.partials,
    ],
    function styleRebuild (done) {
      build.styles()
      notify.msg('info', 'Styles rebuilt.')
      build.email()
      done()
    }
  )
}
