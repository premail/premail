'use strict'

/* eslint-disable no-unused-vars */
const { config } = require('../config/setup.js')
const notify = require('../ops/notifications.js')
/* eslint-enable no-unused-vars */

//
// List all source templates used during build tasks.
//

module.exports = async function listTemplates () {
  notify.msg('debug', config.current.templates.main, 'Main template file:')
  notify.msg('debug', config.current.templates.list, 'Partials:')
}
