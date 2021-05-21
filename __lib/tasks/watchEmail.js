'use strict'

/* eslint-disable no-unused-vars */
const { watch, series, parallel } = require('gulp')
const path = require('path')
// https://www.npmjs.com/package/gulp-changed

const { config } = require('../vars/config.js')
const e = require('../functions/e.js')
const notify = require('../vars/notify.js')

const buildStyles = require('../tasks/buildStyles.js')
const buildTemplates = require('../tasks/buildTemplates.js')
const buildHTML = require('../tasks/buildHTML.js')
const buildText = require('../tasks/buildText.js')
/* eslint-enable no-unused-vars */

//
// Watch design and configuration files and rebuild as necessary.
//

module.exports = function watchEmail (done) {
  notify.watch('watching')

  const paths = {
    configBuild: config.file.user,
    configTheme: config.current.theme.path + path.sep + config.file.theme,
    style:
      config.current.theme.path + config.current.theme.sassDir + '/**/*.scss',
    templates: config.current.path + '/**/*.' + config.user.files.templateExt,
    html: config.current.path + '/**/*.html',
  }

  notify.debug(
    `\nBuild config: ${paths.configBuild}\nTheme config: ${paths.configTheme}\nStyles:       ${paths.style}\nTemplates:    ${paths.templates}\nHTML:         ${paths.html}`,
    'Watching these paths:'
  )

  // Trigger style rebuild.
  watch(
    [paths.configBuild, paths.configTheme, paths.style],
    { delay: 500 },
    function styleRebuild (done) {
      buildStyles(done)
      buildTemplates(done) // @TODO: Erroring on file-include
      notify.info('Styles rebuilt.')
      done()
    }
  )

  // Trigger HTML rebuild.
  watch(
    [paths.configBuild, paths.configTheme, paths.templates],
    { delay: 500 },
    function htmlRebuild (done) {
      buildHTML(done)
      notify.info('HTML rebuilt.')
      done()
    }
  )

  // Trigger text rebuild.
  if (config.user.text.generate) {
    watch(
      [paths.configBuild, paths.html],
      { delay: 500 },
      function textRebuild (done) {
        buildText(done)
        notify.info('Plain-text version rebuilt.')
        done()
      }
    )
  }
}
