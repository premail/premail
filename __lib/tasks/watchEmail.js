'use strict'

/* eslint-disable no-unused-vars */
const { watch, series, parallel } = require('gulp')
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

// Trigger style rebuild.
function watchStyles (done) {
  watch(
    [config.current.theme.path + config.current.theme.sassDir + '/**/*.scss'],
    { delay: 500 },
    function rebuild (done) {
      buildStyles(done)
      buildTemplates(done)
      notify.info('Styles rebuilt.')
      done()
    }
  )
}

// Trigger HTML rebuild.
// function watchHTML (done) {
//   watch(
//     [config.current.path + '/**/*.' + config.user.files.templateExt],
//     { delay: 500 },
//     function rebuild (done) {
//       buildHTML(done)
//       notify.info('HTML rebuilt.')
//       done()
//     }
//   )
// }

// Trigger text rebuild.
// function watchText (done) {
//   if (config.user.text.generate) {
//     watch(
//       [config.current.path + '/**/*.html'],
//       { delay: 500 },
//       function rebuild (done) {
//         buildText(done)
//         notify.info('Plain-text version rebuilt.')
//         done()
//       }
//     )
//   }
// }

module.exports = function watchEmail (done) {
  // series(
  // notify.watch('watching')
  // parallel(
  watchStyles(done)
  // )
  // )
}
