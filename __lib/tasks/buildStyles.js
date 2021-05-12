'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const replace = require('gulp-replace')
const path = require('path')
const sass = require('gulp-sass')
const sassImporter = require('node-sass-json-importer')
const Fiber = require('fibers')
sass.compiler = require('sass')

const e = require('../functions/e.js')
const { config } = require('../vars/config.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
const { themeVars } = require('../functions/themeVars.js')
/* eslint-enable no-unused-vars */

//
// Build CSS files from Sass source files.
//

// log(config.theme.colors)

// const themeVal = {}
// for (const setting in config.theme) {
//   const configVal = setting.replace(/\./g, '_')
//   log(configVal)
//   // Object.assign(themeVal, file)
// }

// Object.keys(config.theme).forEach(key => {
//   const configVal = JSON.stringify(key, null, 2)
//   log(configVal)
// })

module.exports = function buildStyles (done) {
  src(config.current.theme.path + config.current.theme.sassDir + '/**/*.scss')
    // Replace config placeholders with values
    // .pipe(replace(/config\(.*\)/g, config.theme.colors.links))
    // .pipe(postcss([postcssReplace({
    //   data: {value: '/*# sourceMappingURL'},
    //   pattern: '(?:\\/\\/\\#\\ sourceMappingURL)'
    // })]))

    // Render CSS
    .pipe(
      sass({
        fiber: Fiber,
        outputStyle: 'compressed',
        importer: sassImporter(),
      }).on('error', e.sassError)
    )

    // Write files
    .pipe(dest(config.current.theme.temp + config.current.theme.sassDir))
    .on('end', function () {
      debug(
        msg.b('CSS files written to:\n') +
          config.current.theme.temp +
          config.current.theme.sassDir
      )
    })

  done()
}
