'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const prompts = require('prompts')

const procTime = require.main.require('./src/helpers/procTime')
const isDirEmpty = require.main.require('./src/helpers/isDirEmpty')
const { config } = require.main.require('./src/config/setup')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Create project structure
//

const source = config.init
const dest = '.'

// Iterate over and copy project structure
function createStructure () {
  const path = fs.readdirSync(source)
  for (const i in path) {
    notify.msg('plain', `Creating '${path[i]}'`)
  }

  try {
    fs.copySync(source, dest)
  } catch (err) {
    notify.msg('error', err)
  }

  notify.msg('success', 'Premail project initialized!')
}

// Initialize project creation
function init () {
  createStructure()
  procTime(createStructure, 'Project initialization')
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
      init()
    }
  })()
}

function structure () {
  notify.msg('info', 'Initializing Premail project...')

  if (fs.existsSync(config.file.project)) {
    confirm('A Premail project appears to be already initialized here.')
  } else if (!isDirEmpty(dest)) {
    confirm('Data already exists in this folder.')
  } else {
    init()
  }
}

module.exports = {
  structure,
}
