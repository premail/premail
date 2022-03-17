'use strict'

/* eslint-disable no-unused-vars */
const browserSync = require('browser-sync').create('Premail')
const flags = require('yargs').argv

const e = require.main.require('./src/ops/errors')
const { config } = require.main.require('./src/config/setup')
const { current } = require.main.require('./src/config/current')
const { templates } = require.main.require('./src/config/templates')
const notify = require.main.require('./src/ops/notifications')
/* eslint-enable no-unused-vars */

//
// Load project in web server
//

let noServe = false
if (flags.s || flags.noserve) {
  noServe = true
}

function start(done) {
  if (!noServe) {
    browserSync.init({
      server: {
        baseDir: config.current.dist,
      },
    })
  }
  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

module.exports = {
  start,
  reload,
}
