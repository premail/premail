'use strict'

/* eslint-disable no-unused-vars */
const { watch, series } = require('gulp')

const { config } = require('../vars/config.js')
const e = require('../functions/e.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')

const buildStyles = require('../tasks/buildStyles.js')
const buildHTML = require('../tasks/buildHTML.js')
const buildText = require('../tasks/buildText.js')
/* eslint-enable no-unused-vars */

//
// Watch design and configuration files and rebuild as necessary.
//
module.exports = function watchEmail () {
  // Trigger style rebuild.
  watch(
    [config.current.theme.path + config.current.theme.sassDir + '/**/*.scss'],
    buildStyles
  )
    .on('error', e.sassError)
    .on('change', function (path, stats) {
      log(msg.info('Styles rebuilt.'))
    })

  // Trigger template rebuild.
  watch(
    config.current.path + '/**/*.' + config.user.files.templateExt,
    buildHTML
  )
    .on('error', e.mjmlError)
    .on('change', function (path, stats) {
      log(msg.info('HTML rebuilt.'))
    })

  // Trigger text rebuild.
  if (config.user.text.generate) {
    watch('./**/*.html', buildText)
      .on('error', e.textError)
      .on('change', function (path, stats) {
        log(msg.info('Plain-text rebuilt.'))
      })
  }
}
