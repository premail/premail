# Contributing to Premail

**Thank you** for taking the time to contribute!

When contributing, especially for the first time, consider starting by
[creating an issue](https://github.com/premail/premail/issues/new) so you can
get feedback from the maintainers and avoid unncessary work.

Premail has a [code of conduct](CODE_OF_CONDUCT.md): Please follow it in all
your interactions with the project.

## Issues and feature requests

You've found a bug in the source code, a mistake in the documentation or maybe
you'd like a new feature? You can help us by
[submitting an issue on GitHub](https://github.com/premail/premail/issues).
Before you create an issue, make sure to search the issue archive -- your issue
may have already been addressed!

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what
  environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a single bug._ One bug per report.

**Even better: Submit a pull request with a fix or new feature!**

## How to submit a Pull Request

1. Search our repository for open or closed
   [Pull Requests](https://github.com/premail/premail/pulls) that relate to your
   submission. You don't want to duplicate effort.
2. Fork the project
3. Create your feature branch (`git checkout -b feat/amazing_feature`)
4. Commit your changes (`git commit -m 'feat: add amazing_feature'`) Premail
   uses [conventional commits](https://www.conventionalcommits.org), so please
   follow the specification in your commit messages.
5. Push to the branch (`git push origin feat/amazing_feature`)
6. [Open a Pull Request](https://github.com/premail/premail/compare?expand=1)

## Development environment setup

1. Clone the repo

   ```sh
   git clone https://github.com/premail/premail
   ```

2. Run `node --version` to determine your release of Node. Premail requires at
   least version 12.x.

If you don't have Node installed,
[download Node 12.x](https://github.com/nodejs/Release#release-schedule) and
install it.

If you do have it installed and are on a release other than 12.x, consider using
[n](https://github.com/tj/n) or [nvm](https://github.com/nvm-sh/nvm) to allow
you to work on 12.x with this project.

Premail has been tested up to Node 16.x and appears to work, but because of a
[limitation in gulp](https://github.com/gulpjs/glob-watcher/issues/55), if you
use a version newer than 12.x you will be unable to use the `watch` functions.

3. In your development directory, run `npm install`.

4. If you don't already have syntax highlighting for MJML, there are
   [plugins](https://documentation.mjml.io/#applications-and-plugins) for Visual
   Studio Code, Atom, and Sublime Text 3 and 4.

## Project structure walk-through

- [`index.js`](/index.js) uses [yargs](https://yargs.js.org) to pass tasks and
  other functions to the `premail` command.
- [`gulpfile.js`](/gulpfile.js) defines tasks for [gulp](https://gulpjs.com/).
  Some functions run outside of gulp.
- [`.mjmlconfig`](/.mjmlconfig) defines the
  [custom MJML components](https://github.com/premail/mjml-custom-component) we
  use.
- Other root-level dot-files should be self-explanatory.
- [`src`](/src) contains the program itself.
  - [`config`](/src/config) functions load and process configuration from
    command-line, internal, and user-facing file sources.
  - [`example`](/src/example) contains the scaffolding of a Premail project that
    is created with `premail init`. For more information about how this
    structure operates, see Premail's end-user
    [usage documentation](/README.md#usage).
  - [`helpers`](/src/helpers) are small utility functions, usually from other
    sources.
  - [`ops`](/src/ops) are a kind of catch-all internal function category: error
    handling, command-line flags, console notification and variable validation.
  - [`settings`](/src/settings) are internal default settings for Premail,
    stored in YAML format.
  - [`tasks`](/src/tasks) correspond to `premail` commands. Some of these are
    gulp tasks, and some are pure Node functions.
- [`README.md`](/README.md) and [docs](/docs) contain project documentation.

## Code style and syntax

Premail includes [sheerun/modern-node](https://github.com/sheerun/modern-node),
which formats and lints code using [Prettier](https://prettier.io/). This is
used both in the user-facing project side and internally, so in general it
should clean up and format various language files appropriately:

- JavaScript uses [Standard Style](https://standardjs.com/). Most files are
  written in ES6, but support exists to use Babel for newer syntaxes.
- Gulp tasks are written in
  [version 4](https://gulpjs.com/docs/en/getting-started/creating-tasks) syntax
  and
  [use `pipeline()`, not `.pipe`](https://github.com/gulpjs/gulp/discussions/2586)
- Handlebars processing happens _first_ in the build process, thus all templates
  are named as Handlebars files. Within these templates, you will also see MJML,
  which will be processed second.
- MJML should be valid under
  [version 4](https://github.com/mjmlio/mjml/releases): Use the
  [MJML Try It Live](https://mjml.io/try-it-live/) website to test if necessary.
- Sass files use the SCSS syntax to make it easiest on end-users. It is compiled
  with [Dart Sass](https://sass-lang.com/dart-sass) and uses
  [node-sass-json-importer](https://github.com/pmowrer/node-sass-json-importer)
  (which does, in fact, work with Dart Sass) to import variables from
  configuration files into the Sass files. See
  [`src/config/sassImport.js`](/src/config/sassImport.js) and the `sass()`
  function in [`src/tasks/build.js`](/src/tasks/build.js) for the
  implementation.
- YAML and Markdown files are wrapped when possible at 80 characters. This is
  enforced with Prettier.
- Indents are 2 spaces, enforced with [`.editorconfig`](/.editorconfig).
