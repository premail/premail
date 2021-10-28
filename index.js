#!/usr/bin/env node

'use strict'

/* eslint-disable no-unused-vars */
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const tasks = require('./gulpfile.js')
/* eslint-enable no-unused-vars */

const argv =
  // End
  yargs(hideBin(process.argv))
    // General settings
    .showHelpOnFail(false, 'Use --help for available options')
    .usage('Usage: $0 <command> [options]')

    // Build
    .command(['build', '$0'], 'Build your email', yargs => {
      console.log('Running build command')
    })

    // Init
    .command('init', 'Initialize an email project', yargs => {
      tasks.init()
    })

    // Destroy (hidden)
    .command('destroy', 'Destroy an email project', yargs => {
      tasks.destroy()
    })

    // Aliases
    .alias('h', 'help')
    .alias('v', 'version')

    // Help
    .help('h')
    .epilogue('Additional documentation: https://premail.dev').argv

module.exports = {
  argv,
}
