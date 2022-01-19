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
// Destroy project structure
//

const source = config.init
const dest = '.'

// Iterate over and destroy items matching `init` structure.
function destroyStructure () {
  const path = fs.readdirSync(source)

  notify.msg('warn', 'Destroying Premail project ')
  for (const i in path) {
    const item = path[i]
    try {
      if (fs.existsSync(item)) {
        if (fs.lstatSync(item).isDirectory()) {
          fs.rmdirSync(item, { recursive: true })
        } else {
          fs.unlinkSync(item)
        }
        notify.msg('plain', `Deleted '${item}'`)
      }
    } catch (err) {
      notify.msg('error', err)
    }
  }
  notify.msg('success', 'Premail project destroyed.')
}

// Enable passing of --yes to this command to bypass confirmation.
prompts.override(require('yargs').argv)

// Confirm user really wants to destroy data.
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

function structure () {
  if (isDirEmpty(dest)) {
    notify.msg('info', 'Directory is already empty.')
    process.exit(0)
  }
  if (!fs.existsSync(config.file.project)) {
    notify.msg(
      'error',
      `${config.file.project} not found.`,
      "This doesn't appear to be a Premail project directory."
    )
    process.exit(0)
  }
  confirm()
}

module.exports = {
  structure,
}
