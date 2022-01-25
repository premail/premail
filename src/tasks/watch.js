'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const nodewatch = require('node-watch')

const tasks = require.main.require('./gulpfile')
const e = require.main.require('./src/ops/errors')
const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { templates } = require.main.require('./src/config/templates')
const { design } = require.main.require('./src/config/design')
const { flags } = require.main.require('./src/ops/flags')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Watch design and configuration files and rebuild as necessary.
//
function email () {
  if (fs.existsSync(config.file.project)) {
    const paths = {
      configProject: config.file.project,
      configDesign: config.file.design,
      template: config.current.templates.main,
      design: path.resolve(config.current.design.path, 'theme'),
      content: path.resolve(config.current.path, 'content'),
      structure: path.resolve(config.current.path, 'structure'),
    }

    const watchPaths = [
      paths.configProject,
      paths.configDesign,
      paths.template,
      paths.design,
      paths.content,
      paths.structure,
    ]

    notify.watch('watching')

    notify.msg(
      'debug',
      `\nProject config: ${paths.configProject}\nDesign config: ${paths.configDesign}\nTemplate:       ${paths.template}\nDesign:       ${paths.design}\nContent:     ${paths.content}\nStructure:     ${paths.structure}`,
      'Watching these paths:'
    )

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
        tasks.rebuild()
      }
    )
  }
}

module.exports = {
  email,
}
