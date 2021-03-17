A quick-start setup for those writing email code in [MJML](https://mjml.io/),
the email templating language, using Node and Gulp.

The templates included are
[valid](https://mjml.io/documentation/#validating-mjml) under
[MJML version 4](https://github.com/mjmlio/mjml/releases).

One `index.html` file will be rendered, ready to import into your emailer of
choice. [See example.](https://rootwork.github.io/mjml-quickstart/_templates/index.html)

<!-- The following section, from "ts" to "te", is an automatically-generated
  table of contents, updated whenever this file changes. Do not edit within
  this section. -->

<!--ts-->

- [Overview](#overview)
- [Setup](#setup)
  - [If you have Sublime Text 3](#if-you-have-sublime-text-3)
- [Usage](#usage)
  - [Creating a new design](#creating-a-new-design)
    - [Sublime Text 3 users](#sublime-text-3-users)
  - [Creating a new email from an existing design](#creating-a-new-email-from-an-existing-design)
  - [Rendering the email for production](#rendering-the-email-for-production)
- [Notes on project structure](#notes-on-project-structure)
- [Known issues](#known-issues)
- [Thanks and Sponsorships](#thanks-and-sponsorships)
- [License](#license)

<!-- Added by: runner, at: Wed Mar 17 21:04:39 UTC 2021 -->

<!--te-->

# Overview

If you're here, you are probably already familiar with MJML, but if not you
should [read a little about it](https://documentation.mjml.io) first.

The structure of this is such you should use it to contain all of your email
projects within a single design.

For instance, if you're a freelancer, you'd fork this project once each for
Company A and Company B, and place each individual email as a subdirectory
inside the company directories. For more information, see the Notes section at
the bottom.

# Setup

This has been tested with Node version 10.19.0 and NPM version 7.6.3 and should
work with any newer releases. The gulp and MJML requirements are listed in
[`package.json`](package.json) and will be installed automatically.

- Go to the [Releases](https://github.com/rootwork/mjml-quickstart/releases)
  page and grab the most recent stable version. Alternatively, you can simply
  fork this repo and clone it locally.
- Remove the `.github` folder if you don't want to use
  [GitHub Actions](https://docs.github.com/en/actions).
- Install with `npm i`

## If you have Sublime Text 3

- Copy the Sublime build file into your configuration:
  - Linux: `cp MJML.sublime-build ~/.config/sublime-text-3/Packages/User`
  - Mac: `cp MJML.sublime-build ~/Library/Application Support/Sublime Text 3/Packages/User`
  - Windows: `cp MJML.sublime-build %APPDATA%\Sublime Text 3/Packages/User`
- Open Sublime Text
  - Install the Package
    [MJML-syntax](https://packagecontrol.io/packages/MJML-syntax).

# Usage

## Creating a new design

Edit the contents of `_templates` to fit your design that will be in place for
each email.

- `index.mjml`: This file includes all the component files. You shouldn't
  normally need to edit this unless you are re-ordering the structure or
  changing the `lang` value.
- `content`: This folder holds files that will _always_ change in each email
  -- the title, preview text, header/hero area and main body.
- `structure`: This folder holds files that may _sometimes_ change in each
  email -- top and bottom navigation menus, social media links, and the footer
  area.
- `style`: This folder contains the CSS attributes that, ideally, _will not_
  change from project to project.
- `dist`: This folder doesn't exist initially, but will contain the output
  `index.html` for you to use.

In your console, run `gulp watch`. This will watch for any changes in any
`index.mjml` files (including any partials referenced with `<mj-include>`), and
re-render `index.html` file in unminified form in the `dist` subdirectory. You
can leave your browser open to this page.

If you don't want to continuously watch your files, you can simply run `gulp`
and it will build the `index.html` file in unminified form and then stop.

### Sublime Text 3 users

Sublime should auto-detect the build-system based on your files, but you can
check by going to Tools > Build System > MJML

Be sure that in the Tools menu, "Save All on Build" is checked (which is the
default).

Then, you can press <kbd>Ctrl-B</kbd> to run the unminified build.

## Creating a new email from an existing design

1. Once you have a standard design, copy the `_templates` directory and give it
   a name for a specific email.
2. Edit the `.mjml` files as necessary for this individual email.
3. Use the watch or build options above to recompile into an `index.html` file
   you can import into your email sender of choice.

## Rendering the email for production

In your console, run `gulp export`. This will render `index.html`
[in minified form](https://github.com/mjmlio/mjml/blob/master/packages/mjml-cli/README.md#minify-and-beautify-the-output-html)
in the `dist` subdirectory of your design.

Images can be included locally while you're drafting the email, but MJML doesn't
do anything magical in terms of hosting these images -- you'll still have to
upload them somewhere and change the references to the hosted images.

Once the production email is rendered, you can:

- import directly (as HTML) into your emailer of choice
- share the `index.html` file with colleagues
- upload the file as part of a repo and use something like
  [GitHub Pages](https://pages.github.com/) to view/share it in a browser; for
  instance
  [here's the rendered file](https://rootwork.github.io/mjml-quickstart/_templates/dist/index.html)
  from the sample templates

## Cleaning up your MJML files

Run `gulp mjml_pretty` to auto-format all of your `.mjml` files.

# Notes on project structure

This project is designed to become your overarching directory in which
individual email projects with a single design are kept in subdirectories. Gulp
looks for `index.mjml` files in the current directory and any subdirectories,
and renders them into the `dist` subdirectory as `index.html` files.

Generally this isn't a huge problem: Should re-rendered older projects change
somehow (for instance through new versions of MJML itself), you can simply
choose to not commit the changed files, because you're using version-control.

However, it may introduce issues of scale, if you have a directory with hundreds
of email projects all getting re-rendered on `gulp` or `watch`.

If that worries you or is becoming an issue, just use a separate directory for
each project, re-forking this project for every new one.

# Known issues

- [Gulp output includes MJML depreciation notices](https://github.com/mjmlio/mjml/issues/2205)
  over which we have no control. The options `mjml` is warning us about will be
  moved to `mjml-cli` once we're given a way to do that.

- The `signoff.mjml` template, used for a signature or closing with a person's
  image, uses a regular `<img>` tag with inline styles. This will be moved to a
  custom component in a future release.

# Thanks and Sponsorships

Work funded in part by [Multi-Etch, LLC](https://www.multietch.com/).

Built with original inspiration from
[dalefish/mjml-boilerplate-win](https://github.com/dalefish/mjml-boilerplate-win).

Thanks, of course, to the folks working on
[mjmlio/mjml](https://github.com/mjmlio/mjml). You are the light in the terrible
email-HTML darkness.

# License

GPLv3. See [LICENSE](LICENSE).
