'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const nodewatch = require('node-watch')
const { series } = require('gulp')

const e = require.main.require('./src/ops/errors')
const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { templates } = require.main.require('./src/config/templates')
const { design } = require.main.require('./src/config/design')
const { flags } = require.main.require('./src/ops/flags')
const build = require.main.require('./src/tasks/build')
const notify = require.main.require('./src/ops/notifications')
const { paths } = require.main.require('./src/tasks/listPaths')
/* eslint-enable no-unused-vars */

//
// Watch design and configuration files and rebuild as necessary.
//
function email () {
  if (fs.existsSync(config.file.project)) {
    // Generate watch paths from the current configuration
    const watchPaths = []
    Object.keys(paths).forEach(key => {
      watchPaths.push(paths[key])
    })

    notify.watch('watching')

    // We don't use recursive watching here because it doesn't work on Linux
    // filesystems. Ref: https://www.npmjs.com/package/node-watch#Example
    nodewatch(
      watchPaths,
      {
        recursive: false,
        delay: 1000,
      },
      function (event, filename) {
        notify.msg('info', `${filename} file changed. Rebuilding email.`)
        series(build.styles, build.content, build.structure)
      }
    )
  }
}

module.exports = {
  email,
}
