'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const prompts = require('prompts')

const isDirEmpty = require.main.require('./src/helpers/isDirEmpty')
const { config } = require.main.require('./src/config/setup')
const copy = require.main.require('./src/ops/copy')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Create project structure
//

const dest = '.'

function createStructure() {
  // Copy project structure
  copy(config.scaf.init, dest, 'project', true, true)

  // Copy project readme
  try {
    fs.copySync(config.scaf.readme, path.basename(config.scaf.readme))
    notify.msg('plain', `Creating '${path.basename(config.scaf.readme)}'`)
  } catch (err) {
    notify.msg('error', err)
  }

  notify.msg('success', 'Premail project initialized!')
}

// Enable passing of --yes to this command to bypass confirmation.
prompts.override(require('yargs').argv)

// Confirm user really wants to overwrite data if files already exist.
function confirm(message) {
  ;(async () => {
    const questions = [
      {
        type: 'confirm',
        name: 'yes',
        initial: false,
        message: '',
        onRender(kleur) {
          this.msg = kleur
            .black()
            .bgYellow(
              ` ⚠ ${message} Continuing may result in overwritten files. Are you sure you want to continue? `
            )
        },
      },
    ]

    const onCancel = (prompt) => {
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

function structure() {
  if (fs.existsSync(config.file.project)) {
    confirm('A Premail project appears to be already initialized here.')
  } else if (!isDirEmpty(dest)) {
    confirm('Data already exists in this directory.')
  } else {
    createStructure()
  }
}

module.exports = {
  structure,
}
