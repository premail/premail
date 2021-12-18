'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const prompts = require('prompts')

const isDirEmpty = require(path.join(__dirname, '../helpers/isDirEmpty.js'))
const { config } = require(path.join(__dirname, '../config/setup.js'))
const notify = require(path.join(__dirname, '../ops/notifications.js'))
/* eslint-enable no-unused-vars */

//
// Create project structure
//

const source = config.init
const dest = '.'

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
  } else if (!isDirEmpty(dest)) {
    confirm('Data already exists in this folder.')
  } else {
    createStructure()
  }
}

module.exports = {
  structure,
}
