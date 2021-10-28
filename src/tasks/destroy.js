'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const prompts = require('prompts')

const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// Destroy project structure
//

// Iterate over and destroy premail directories.
function structure () {
  const dirs = config.init.dirs

  notify.msg('warn', 'Destroying directories ')
  for (const i in dirs) {
    try {
      if (fs.existsSync(dirs[i])) {
        fs.rmdirSync(dirs[i], { recursive: true })
        notify.msg('debug', `Destroyed directory '${dirs[i]}'`)
      }
    } catch (err) {
      notify.msg('error', err)
    }
  }
}

// Enable passing of --yes to this command to bypass confirmation.
prompts.override(require('yargs').argv)

// Ensure user really wants to destroy data.
function confirm () {
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
              ' ⚠ This will DESTROY ALL PREMAIL DATA in this directory. Are you sure you want to continue? '
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
      structure()
    }
  })()
}

module.exports = {
  confirm,
}
