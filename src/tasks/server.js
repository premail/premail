'use strict'

/* eslint-disable no-unused-vars */
const browserSync = require('browser-sync').create('Premail')

const e = require.main.require('./src/ops/errors')
const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { templates } = require.main.require('./src/config/templates')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Load project in web server
//

function launch() {
  browserSync.init({
    server: {
      baseDir: config.current.dist,
    },
    watch: true,
  })
}

module.exports = {
  launch,
}
