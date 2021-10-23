#!/usr/bin/env node

'use strict'

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const tasks = require('./gulpfile.js')

const taskDir = './src/tasks/'
const init = require(taskDir + 'init.js')

/* eslint-disable no-unused-vars */
const argv =
  // .scriptName("premail")
  //   .usage("Usage: $0 -w num -h num")
  //   .example(
  //     "$0 -w 5 -h 6",
  //     "Returns the area (30) by multiplying the width with the height."
  //   )
  //   .option("w", {
  //     alias: "width",
  //     describe: "The width of the area.",
  //     demandOption: "The width is required.",
  //   })

  // .command('$0 [name]', 'say hello', (yargs) => {
  //   yargs
  //     .positional('name', {
  //       describe: 'hello\'s target',
  //       default: 'world'
  //     })
  //     .option('times', {
  //       alias: 't',
  //       type: 'number',
  //       default: 1,
  //       description: 'number of times to say hello'
  //     })
  // }, (argv) => {
  //   for (let i = 0;i < argv.times; i++) {
  //     console.log(`Hello ${argv.name}!`)
  //   }
  // })

  yargs(hideBin(process.argv))
    .usage('Usage: $0 <command> [options]')

    .command(['build', '$0'], 'Build your email', yargs => {
      console.log('Running build command')
    })
    .example('$0 build')

    .command('init', 'Initialize an email project', yargs => {
      init.create()
    })
    .example('$0 init')

    .help('h')

    .alias('h', 'help')
    .alias('v', 'version')

    .epilog('https://premail.dev').argv
/* eslint-enable no-unused-vars */

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
