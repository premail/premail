'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const prompts = require('prompts')

const isDirEmpty = require.main.require('./src/helpers/isDirEmpty')
const { config } = require.main.require('./src/config/setup')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Create project structure
//

const lib = {
  path: config.init.path,
  readme: config.init.readme,
}

const project = {
  path: '.',
  readme: path.basename(config.init.readme),
}

// Iterate over and copy project structure
function createStructure () {
  const path = fs.readdirSync(lib.path)
  for (const i in path) {
    notify.msg('plain', `Creating '${path[i]}'`)
  }

  try {
    fs.copySync(lib.path, project.path)
  } catch (err) {
    notify.msg('error', err)
  }

  // Copy project readme
  try {
    fs.copySync(lib.readme, project.readme)
    notify.msg('plain', `Creating '${project.readme}'`)
  } catch (err) {
    notify.msg('error', err)
  }

  notify.msg('success', 'Premail project initialized!')
}

// Enable passing of --yes to this command to bypass confirmation.
prompts.override(require('yargs').argv)

// Confirm user really wants to overwrite data if files already exist.
function confirm (message) {
  ;(async () => {
    const questions = [
      {
        type: 'confirm',
        name: 'yes',
        initial: false,
        message: '',
        onRender (kleur) {
          this.msg = kleur
            .black()
            .bgYellow(
              ` ⚠ ${message} Continuing may result in overwritten files. Are you sure you want to continue? `
            )
        },
      },
    ]

    const onCancel = prompt => {
      notify.msg('plain', '     Canceled.')
      process.nextTick(() => {
        process.exit(0)
      })
    }

    const response = await prompts(questions, { onCancel })

    if (response.yes) {
      createStructure()
    }
  })()
}

function structure () {
  notify.msg('info', 'Initializing Premail project...')

  if (fs.existsSync(config.file.project)) {
    confirm('A Premail project appears to be already initialized here.')
  } else if (!isDirEmpty(project.path)) {
    confirm('Data already exists in this folder.')
  } else {
    createStructure()
  }
}

module.exports = {
  structure,
}
