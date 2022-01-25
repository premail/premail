#!/usr/bin/env node

'use strict'

/* eslint-disable no-unused-vars */
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const gulp = require('./gulpfile')
const watch = require('./src/tasks/watch')
/* eslint-enable no-unused-vars */

const argv = yargs(hideBin(process.argv))
  // General settings

  .usage('Usage: $0 <command> [options]')

  // Commands

  .command('build', 'Build your email', yargs => {
    gulp.build()
  })

  .command(
    'watch',
    'Watch design and configuration files and rebuild as necessary',
    yargs => {
      gulp.build()
      watch.email()
    }
  )

  .command('format', 'Format templates with Prettier', yargs => {
    gulp.format()
  })

  .command(
    'clean',
    'Remove generated files from the current design or email',
    yargs => {
      gulp.clean()
    }
  )

  .command('init', 'Initialize an email project', yargs => {
    gulp.init()
  })

  .command('destroy', 'Destroy an email project', yargs => {
    gulp.destroy()
  })

  .command('test', false, yargs => {
    gulp.test()
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
