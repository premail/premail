#!/usr/bin/env node

'use strict'

/* eslint-disable no-unused-vars */
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const tasks = require('./gulpfile')
/* eslint-enable no-unused-vars */

const argv = yargs(hideBin(process.argv))
  // General settings

  .usage('Usage: $0 <command> [options]')

  // Commands

  .command('build', 'Build your email', yargs => {
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

  .group(['d', 'e', 'p', 'debug'], 'Email project build and watch:')

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

  .option('debug', {
    describe: 'Append to any command to see verbose details',
    type: 'boolean',
  })

  .group(['temp'], 'Design development:')

  .option('temp', {
    describe:
      'Include intermediate rendered template (post-Handlebars, pre-MJML) in output',
    type: 'boolean',
  })

  // Name the default 'Options' section

  .group(['v', 'h'], 'More information:')
  .alias('v', 'version')
  .alias('h', 'help')

  // Footer

  .epilogue('Additional documentation: https://premail.dev')

// End
argv.parse()
