'use strict'

/* eslint-disable no-unused-vars */
const { config } = require('../vars/config.js')
const notify = require('../vars/notify.js')
/* eslint-enable no-unused-vars */

//
// List all source templates used during build tasks.
//

module.exports = async function listTemplates () {
  notify.debug(config.current.templates.main, 'Main template file:')
  notify.debug(config.current.templates.partials, 'Partials:')
}
