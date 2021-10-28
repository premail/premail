#!/usr/bin/env node

'use strict'

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const tasks = require('./gulpfile.js')

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
    // General settings
    .showHelpOnFail(false, 'Use --help for available options')
    .usage('Usage: $0 <command> [options]')
    // .default('build')
    // .example(
    //   "$0 -w 5 -h 6",
    //   "Returns the area (30) by multiplying the width with the height."
    // )

    // Build
    .command(['build', '$0'], 'Build your email', yargs => {
      console.log('Running build command')
    })

    // Init
    .command('init', 'Initialize an email project', yargs => {
      tasks.init()
    })

    // Destroy (hidden)
    .command('destroy', false, yargs => {
      tasks.destroy()
    })

    // Aliases
    .alias('h', 'help')
    .alias('v', 'version')

    // Help
    .help('h')
    .epilog('https://premail.dev').argv
/* eslint-enable no-unused-vars */
