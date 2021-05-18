'use strict'

/* eslint-disable no-unused-vars */
const { config } = require('../vars/config.js')
const { log, msg, debug } = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// List all source templates used during build tasks.
//

module.exports = async function listTemplates () {
  log(
    msg.debug(
      msg.b('Main template file:\n') + config.current.templates.main + '\n'
    )
  )
  log(msg.debug(msg.b('Partials:\n') + config.current.templates.partials))
}
