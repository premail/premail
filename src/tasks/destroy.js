'use strict'

/* eslint-disable no-unused-vars */
const fs = require('fs-extra')
const path = require('path')
const prompts = require('prompts')

const { config } = require('../config/setup.js')
const notify = require('../ops/notifications.js')
/* eslint-enable no-unused-vars */

//
// Destroy project structure
//

// Iterate over and destroy items matching `init` structure.
function destroyStructure () {
  const path = fs.readdirSync(config.init)

  notify.msg('warn', 'Destroying project ')
  for (const i in path) {
    const item = path[i]
    try {
      if (fs.existsSync(item)) {
        if (fs.lstatSync(item).isDirectory()) {
          fs.rmdirSync(item, { recursive: true })
        } else {
          fs.unlinkSync(item)
        }
        notify.msg('debug', `Destroyed '${item}'`)
      }
    } catch (err) {
      notify.msg('error', err)
    }
  }
}

// Enable passing of --yes to this command to bypass confirmation.
prompts.override(require('yargs').argv)

// Confirm ensure user really wants to destroy data.
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
      destroyStructure()
    }
  })()
}

// Align function name with init function.
function structure () {
  confirm()
}

module.exports = {
  structure,
}
