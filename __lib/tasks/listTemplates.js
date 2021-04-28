'use strict'

/* eslint-disable no-unused-vars */
const paths = require('../vars/paths.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// List all source templates used during build tasks.
//

module.exports = async function listTemplates () {
  log(msg.debug(msg.b('Main template file:\n') + paths.templates.main + '\n'))
  log(msg.debug(msg.b('Partials:\n') + paths.templates.partials))
}
