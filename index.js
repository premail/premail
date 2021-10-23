'use strict'

const tasks = require('./gulpfile.js')

const taskDir = './src/tasks/'
const init = require(taskDir + 'init.js')

init.create()

// Exports
module.exports = {
  build: tasks.build,
  watch: tasks.watch,
  format: tasks.format,
  clean: tasks.clean,
  load: tasks.load,
  list: tasks.list,
  test: tasks.test,
  init: init,
}
