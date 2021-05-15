'use strict'

/* eslint-disable no-unused-vars */
const { watch, series } = require('gulp')

const { config } = require('../vars/config.js')
const e = require('../functions/e.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')

const buildStyles = require('../tasks/buildStyles.js')
const buildTemplates = require('../tasks/buildTemplates.js')
const buildHTML = require('../tasks/buildHTML.js')
const buildText = require('../tasks/buildText.js')
/* eslint-enable no-unused-vars */

//
// Watch design and configuration files and rebuild as necessary.
//
module.exports = function watchEmail (done) {
  // Trigger style rebuild.
  watch(
    [config.current.theme.path + config.current.theme.sassDir + '/**/*.scss'],
    {
      delay: 200, // default
    }
  ).on('change', function (path, stats) {
    buildStyles(done)
    buildTemplates(done)
    log(msg.info('Styles rebuilt.'))
  })

  // Trigger template rebuild.
  watch([config.current.path + '/**/*.' + config.user.files.templateExt]).on(
    'change',
    function (path, stats) {
      buildHTML(done)
      log(msg.info('HTML rebuilt.'))
    }
  )

  // Trigger text rebuild.
  if (config.user.text.generate) {
    watch(['./**/*.html']).on('change', function (path, stats) {
      buildText(done)
      log(msg.info('HTML rebuilt.'))
    })
  }
}
