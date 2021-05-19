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
module.exports = function watchEmail (done) {
  watch(
    [config.current.theme.path + config.current.theme.sassDir + '/**/*.scss'],
    { delay: 500 },
    function rebuild (done) {
      buildStyles(done)
      notify.info('Styles rebuilt.')
      done()
    }
  )

  // return watch(
  //   [config.current.theme.path + config.current.theme.sassDir + '/**/*.scss'],
  //   buildStyles
  // {
  //   delay: 200, // default
  // },
  // function () {
  //   buildStyles(done)
  //   buildTemplates(done)
  //   notify.info('Styles rebuilt.')
  // }
  // )
}

// Trigger HTML rebuild.
// function watchHTML (done) {
// watch([config.current.path + '/**/*.' + config.user.files.templateExt]).on(
//   'change',
//   function (path, stats) {
//     buildHTML(done)
//     notify.info('HTML rebuilt.')
//   }
// )
// }

// Trigger text rebuild.
// function watchText (done) {
// if (config.user.text.generate) {
//   watch(['./**/*.html']).on('change', function (path, stats) {
//     buildText(done)
//     notify.info('HTML rebuilt.')
//   })
// }
// }

// module.exports = function watchEmail () {
//   series(
//     // notify.info('\n⌚ ' + 'WATCHING' + ' ⌚\n'),
//     parallel(watchStyles)
//   )
// }
