#!/usr/bin/env node

'use strict'

/* eslint-disable no-unused-vars */
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const tasks = require('./gulpfile.js')
/* eslint-enable no-unused-vars */

yargs(hideBin(process.argv))
  // General settings

  .showHelpOnFail(false, 'Use --help for available options')
  .usage('Usage: $0 <command> [options]')

  // Commands

  .command(['build', '$0'], 'Build your email', yargs => {
    tasks.build()
  })

  .command(
    'watch',
    'Watch design and configuration files and rebuild as necessary',
    yargs => {
      tasks.watch()
    }
  )

  .command('format', 'Format templates with Prettier', yargs => {
    tasks.format()
  })

  .command(
    'clean',
    'Remove generated files from the current design or email',
    yargs => {
      tasks.clean()
    }
  )

  .command('init', 'Initialize an email project', yargs => {
    tasks.init()
  })

  .command('destroy', 'Destroy an email project', yargs => {
    tasks.destroy()
  })

  .command('test', false, yargs => {
    tasks.test()
  })

  // Options

  .group(['d', 'e', 'p'], 'Build and watch options:')

  .option('d', {
    alias: 'design',
    default: '_default',
    describe: 'Specify design directory to use',
    type: 'string',
  })

  .option('e', {
    alias: 'email',
    describe: 'Specify email directory to render',
    type: 'string',
  })

  .option('p', {
    alias: 'prod',
    describe: 'Render production files (minified, no comments)',
    type: 'boolean',
  })

  .group(['temp', 'debug'], 'Development options:')

  .option('temp', {
    describe:
      'Include intermediate rendered template (post-Handlebars, pre-MJML) in output',
    type: 'boolean',
  })

  .option('debug', {
    describe: 'Display details about configuration and settings',
    type: 'boolean',
  })

  // Additional aliases

  .group(['h', 'v'], 'More information:')
  .alias('h', 'help')
  .alias('v', 'version')

  // Footer

  .epilogue('Additional documentation: https://premail.dev')

  .parse()
