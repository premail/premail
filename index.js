'use strict'

const tasks = require('./gulpfile.js')

// Exports
module.exports = {
  build: tasks.build,
  watch: tasks.watch,
  format: tasks.format,
  clean: tasks.clean,
  load: tasks.load,
  list: tasks.list,
  test: tasks.test,
}
