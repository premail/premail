#!/usr/bin/env node

'use strict'

/* eslint-disable no-unused-vars */
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const gulp = require('./gulpfile')
const paths = require('./src/tasks/getPaths')
const create = require('./src/tasks/create')
const init = require('./src/tasks/init')
const destroy = require('./src/tasks/destroy')
const clean = require('./src/tasks/clean')
const watch = require('./src/tasks/watch')
const format = require('./src/tasks/format')
/* eslint-enable no-unused-vars */

const argv = yargs(hideBin(process.argv))
  // General settings

  .usage('Usage: $0 <command> [options]')

  // Commands

  .command(
    'new <email|design> <dest>',
    'Create a new email or design in <dest>',
    (yargs) => {
      create.item()
    }
  )

  .command('build', 'Build an email', (yargs) => {
    format()
    paths.getPaths()
    gulp.build()
  })

  .command(
    'watch',
    'Watch design and configuration files and rebuild as necessary',
    (yargs) => {
      paths.getPaths()
      gulp.build()
      watch.email()
    }
  )

  .command(
    'clean',
    'Remove generated files from the current design or email',
    (yargs) => {
      clean.generatedSync()
    }
  )

  .command(
    'paths',
    'List paths being used with the current configuration and command-line flags',
    (yargs) => {
      paths.getPaths()
    }
  )

  .command('format', 'Format templates with Prettier', (yargs) => {
    format(true)
  })

  .command('init', 'Initialize a Premail project', (yargs) => {
    init.structure()
  })

  .command('destroy', 'Destroy this Premail project', (yargs) => {
    destroy.structure()
  })

  // Options

  .group(['d', 'e', 'p', 'n', 'debug'], 'Email development:')

  .option('d', {
    alias: 'design',
    default: '_default',
    describe: 'Specify design directory to use',
    type: 'string',
  })

  .option('e', {
    alias: 'email',
    describe: 'Specify email directory to use',
    type: 'string',
  })

  .option('p', {
    alias: 'prod',
    describe: 'Render production files (minified, no comments)',
    type: 'boolean',
  })

  .option('n', {
    alias: 'noformat',
    describe: 'Disable auto-formatting of files using Prettier',
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

  .group(['d', 'e'], 'New emails and designs:')

  // Name the default 'Options' section

  .group(['v', 'h'], 'More information:')
  .alias('v', 'version')
  .alias('h', 'help')

  // Footer

  .epilogue('Additional documentation: https://premail.dev')

// End
argv.parse()
