# MJML Quickstart

![Checks](https://img.shields.io/github/checks-status/rootwork/mjml-quickstart/main.svg?style=flat-square)
[![Node ^12.22.1](https://img.shields.io/badge/node-%5E12.22.1-brightgreen.svg?style=flat-square)](https://nodejs.org/en/download/)
[![MJML 4.0+ valid](https://img.shields.io/badge/mjml-4%2B-brightgreen.svg?style=flat-square)](https://github.com/mjmlio/mjml/releases)
[![Code style: JS Standard](https://img.shields.io/badge/code_style-standard-blue.svg?style=flat-square)](https://standardjs.com)
[![Code format: Prettier](https://img.shields.io/badge/code_format-prettier-blue.svg?style=flat-square)](https://github.com/prettier/prettier)

A quick-start setup for those writing email code in [MJML](https://mjml.io/),
the email templating language, with lots of command-line helper tools using Node
and Gulp.

Email templates are all [valid](https://mjml.io/documentation/#validating-mjml)
under [MJML version 4](https://github.com/mjmlio/mjml/releases).

One `index.html` file will be rendered, as well as (optionally) a plain-text
version, ready to import into your emailer of choice.
[See an example of the default layout.](https://rootwork.github.io/mjml-quickstart/designs/_templates/index.html)

<!-- The following section, from "ts" to "te", is an automatically-generated
  table of contents, updated whenever this file changes. Do not edit within
  this section. -->
<!-- prettier-ignore-start -->

<!--ts-->
* [MJML Quickstart](#mjml-quickstart)
* [Overview](#overview)
* [Features](#features)
* [Setup](#setup)
   * [Requirements](#requirements)
   * [Installation](#installation)
* [Usage](#usage)
   * [Setting options](#setting-options)
   * [Creating a new design](#creating-a-new-design)
   * [Creating a new email from an existing design](#creating-a-new-email-from-an-existing-design)
   * [Rendering the email for production](#rendering-the-email-for-production)
   * [Automatic code formatting and linting](#automatic-code-formatting-and-linting)
* [Full list of options](#full-list-of-options)
* [Known issues](#known-issues)
* [Thanks and Sponsorships](#thanks-and-sponsorships)
* [License](#license)

<!-- Added by: runner, at: Wed Aug 11 00:20:13 UTC 2021 -->

<!--te-->
<!-- prettier-ignore-end -->

# Overview

If you're here, you are probably already familiar with MJML, but if not you
should [read a little about it](https://documentation.mjml.io) first. It's a
component-based templating system that makes writing marketing or transactional
emails vastly easier, more compatible, and mobile-responsive. If you're
comfortable with HTML code, MJML will likely be much faster for you than any
drag-and-drop visual editor provided by an email service provider like
Mailchimp, Constant Contact, etc.

This project gives you a structure and workflow in which you can create
different email designs in MJML, then create individual emails based on those
designs from the command-line. Even if you're not a command-line wizard, the
tools included will make creating and managing the code files for your emails
vastly simpler.

When you're done, you'll have an `index.html` file (and plain-text `index.txt`
file, if you've chosen the text option) that is optimized to render correctly in
[the vast majority of email systems and clients](https://mjml.io/faq#email-clients).
Then just drop the code from the file into your email service provider's system.

# Features

- MJML-standard bulletproof code that will look its best across all email
  clients, reduced to the smallest possible size.

- Component-based templates that allow you to separate out things that don't
  often change (navigation menus, social media links, unsubscribe text) and
  things that will usually change (a header or banner, preheader text, and the
  main body of the email).

- You can create multiple designs, and each time you create a new email you can
  choose from among your existing designs. This allows you to keep the structure
  of the design and the content of the email separate, and reduces errors.

- As you're creating a design or crafting a new email, you can use a `watch`
  task to automatically recompile the result.

- Within each design, the CSS (created in [Sass files](https://sass-lang.com/))
  is automatically inlined in the HTML, thanks to MJML. Additionally, stub files
  exist for including pseudo-CSS styles (such as hover states) for email clients
  that support them, as well as styles specifically targeting Gmail.

- A plain-text version of your email is optionally created, and (we humbly
  argue) MJML Quickstart does a much better job than most email services at
  rendering it. While only a small number of your recipients will see the
  plain-text version,
  [they are important for email deliverability](https://www.litmus.com/blog/best-practices-for-plain-text-emails-a-look-at-why-theyre-important/).
  Within the plain-text version options, you can easily control whether certain
  elements like navigation or header/banner areas are included.

- Configuration files are written in [YAML](https://blog.stackpath.com/yaml/),
  making them easy to read, and comments -- with links to relevant resources --
  are included throughout.

- Perfectly structured for including in a git repo -- don't rely on your email
  service provider to keep an archive of your past emails! And
  [Prettier](https://prettier.io/) is included to automatically clean up
  template formatting for easier file-diffing.

When it comes to the content of your emails, optional enhancements can be
controlled per-email:

- Transforming quotes, apostrophes, and dashes to their correct typographical
  versions; optical character alignment; and true small-caps formatting with
  [Detergent](https://codsen.com/os/detergent) and
  [Typeset](https://github.com/davidmerfield/typeset#readme).
- Enforcing
  [proper image `alt` tags](https://support.siteimprove.com/hc/en-gb/articles/115000013031-Accessibility-Image-Alt-text-best-practices)
  and making sure the supplied text doesn't break email code parsers.
- [Padding preview/preheader text](https://www.goodemailcode.com/email-code/preheader)
  to prevent things like navigation menu items from being included there.
- Feel free to
  [make suggestions for more enhancements!](https://github.com/rootwork/mjml-quickstart/issues)

# Setup

## Requirements

You need to have at least [Node](https://nodejs.org/en/download/) 12.x. This
tool has been tested from Node 10.x to 16.x and appears to work, with the caveat
that **if you want to be able to use the `watch` function you need to stay at
[Node 12.x or below](https://github.com/nodejs/Release#release-schedule)**
because of a
[limitation in gulp](https://github.com/gulpjs/glob-watcher/issues/55). (This
means you'll see an unfortunate number of depreciation warnings upon
installation.) If you don't need to use `watch`, you can run Node LTS. I
recommend using [n](https://github.com/tj/n) or
[nvm](https://github.com/nvm-sh/nvm) if you're managing multiple versions of
Node.

This tool uses [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
4.0.2+ and [MJML](https://github.com/mjmlio/mjml/releases) 4.9.3+, but these are
installed automatically during setup, so it's only important to check these if
you already have them installed.

## Installation

- Go to the [Releases](https://github.com/rootwork/mjml-quickstart/releases)
  page and grab the most recent stable version. Alternatively, you can simply
  fork this repo and clone it locally.
- Install with `npm i`
- MJML has [plugins](https://documentation.mjml.io/#applications-and-plugins)
  for Visual Studio Code, Atom, and Sublime Text 3 and 4.
- If you plan to use a GitHub repo yourself and don't want the included
  [GitHub Actions](https://docs.github.com/en/actions) to run, just remove the
  `.github` directory.

# Usage

Run `gulp --tasks` if you want to see all of the options quickly, or skip down
to the [full list of options](#full-list-of-options).

## Setting options

Look at the [`config.yaml`](config.yaml) file at the root of the project.

Here you'll find options for setting the names of your `designs` and `emails`
directories, which will hold individual designs and emails, respectively. You
can also change the name of the master template file (`index.hbs`, by default).

Under "Email-building options," you'll see preferences you can set on the
rendered emails such as whether to generate a plain-text version.

## Creating a new design

Look in the `designs` subdirectory. This will hold each of the designs
(structure and styling) for your emails. For instance, you might have a
newsletter design, a welcome message design, and a special holiday design.

The `_templates` directory holds an example design. You can choose to use this
design and modify it, or write your own.

If you're starting out for the first time and want to create a new design with
the name "postmodern", for instance, you'd do the following in your console:

```sh
cd designs
cp -r _templates postmodern
cd postmodern
```

Within each design directory, you'll find the following:

- `index.hbs`: This file includes all the component files. You shouldn't
  normally need to edit this unless you are re-ordering the structure or
  changing the `lang` value.
- `content`: This directory holds files that will _always_ change in each email
  -- the title, preview text, header/hero area and main body.
- `structure`: This directory holds files that may _sometimes_ change in each
  email -- top and bottom navigation menus, social media links, and the footer
  area.
- `theme`: This directory contains the CSS attributes that, ideally, _will not_
  change from project to project, and a `themeConfig.yaml` file controlling
  options specific to this theme.
- `dist`: This directory contains the output `index.html` (and optionally a
  plain-text `index.txt` file) for you to use.

In your console, run `gulp watch` with the `-d` option, followed by the
directory name of your design. Using the example above with a design named
"postmodern", you'd run `gulp watch -d postmodern`.

This will watch for any changes in any `index.hbs` files (including any MJML
partials referenced with `<mj-include>`), and re-render the `index` files in
unminified form in the `dist` subdirectory of your design. You can leave a web
browser open to this page.

If you don't want to continuously watch your files, use `gulp build`, or just
`gulp` instead. Again using the "postmodern" example, that would be
`gulp build -d postmodern`. This will create the `index` files and then stop.

If you need to troubleshoot the rendered template (that is, after the Handlebars
data has been inserted, but before the MJML-to-HTML transpiling) append `--temp`
to a command and it will include an `index.mjml` file in the output.

## Creating a new email from an existing design

Instructions TK.

## Rendering the email for production

In your console, append `--prod`, e.g. with a design named "postmodern," you'd
use `gulp build -d postmodern --prod`. This will render `index.html`
[in minified form](https://github.com/mjmlio/mjml/blob/master/packages/mjml-cli/README.md#minify-and-beautify-the-output-html)
in the `dist` subdirectory.

Images can be included locally while you're drafting the email, but MJML doesn't
do anything magical in terms of hosting these images -- you'll still have to
upload them somewhere and use the full URLs as references to the hosted images.

Once the production email is rendered, you can:

- Copy the code from `index.html` into your emailer of choice; all the code and
  styles are included!
- Copy the `index.txt` plain-text version, if you've chosen to have one created,
  into the appropriate place provided by your emailer.
- Share these files with colleagues.
- Upload the files as part of a repo and use something like
  [GitHub Pages](https://pages.github.com/) to view/share it in a browser -- for
  instance
  [here's the rendered file](https://rootwork.github.io/mjml-quickstart/designs/_templates/dist/index.html)
  from the sample templates.

## Automatic code formatting and linting

mjml-quickstart includes
[sheerun/modern-node](https://github.com/sheerun/modern-node), which formats and
lints code using [Prettier](https://prettier.io/). This will warn you about
errors in the HTML, Sass or CSS syntax of your designs or emails, and
auto-format your files on every build and git commit.

It will not attempt to format or lint files in the `dist` directories.

If you want to format your template files separately (for instance while you're
working on them), run `gulp formatTemplates`. This is run automatically during
builds.

If you don't want the linting and formatting on commits, remove the `precommit`
hook in [package.json](package.json).

# Full list of options

Append `--debug` to any command to see additional output on your current
configuration and files being processed.

`gulp --tasks`

<!-- prettier-ignore-start -->
<!-- markdown-exec(cmd:echo '<'!'-- '-'->\n```' && gulp --tasks | grep -Po "[├│└].*|^[\s].*" && echo '```\n<'!'-- '-'->') --><!-- -->
```
├─┬ default          Render a complete HTML email based on design and email templates.
│ │      -d          …Specify design folder to use. (Default: _templates)
│ │      -e          …Specify email folder to render.
│ │  --prod          …Render production files (minified, no comments).
│ │  --temp          …Include intermediate rendered template (post-Handlebars, pre-MJML) in output.
│ │ --debug          …Display details about configuration and settings.
│ └─┬ <series>
│   ├── showConfig
│   ├── formatTemplates
│   ├── clean.generated
│   ├─┬ <parallel>
│   │ ├── build.content
│   │ └── build.styles
│   └── build.render
├─┬ build            Render a complete HTML email based on design and email templates.
│ │      -d          …Specify design folder to use. (Default: _templates)
│ │      -e          …Specify email folder to render.
│ │  --prod          …Render production files (minified, no comments).
│ │  --temp          …Include intermediate rendered template (post-Handlebars, pre-MJML) in output.
│ │ --debug          …Display details about configuration and settings.
│ └─┬ <series>
│   ├── showConfig
│   ├── formatTemplates
│   ├── clean.generated
│   ├─┬ <parallel>
│   │ ├── build.content
│   │ └── build.styles
│   └── build.render
├── build.content
├── build.styles
├── build.render
├─┬ watch            Watch design and configuration files and rebuild (formatted, with comments) as necessary. Flags from `gulp build` can also be used.
│ └─┬ <series>
│   ├── showConfig
│   ├── formatTemplates
│   ├─┬ <parallel>
│   │ ├── build.content
│   │ └── build.styles
│   ├── build.render
│   └── watchEmail
├── formatTemplates  Format templates with Prettier.
├── clean.generated  Remove generated files from the current design or email.
├── showConfig       Display the current configuration being used when rendering your email files. Use with --debug
├── listTemplates    List all templates that will be processed. Use with --debug
└── test             Run an empty gulp function for testing.
```
<!-- --><!-- /markdown-exec -->
<!-- prettier-ignore-end -->

# Known issues

- [Gulp output includes MJML depreciation notices](https://github.com/mjmlio/mjml/issues/2205)
  over which we have no control. The options `mjml` is warning us about will be
  moved to `mjml-cli` once we're given a way to do that.

- The `signoff.mjml` template, used for a signature or closing with a person's
  image, uses a regular `<img>` tag with inline styles. This will be moved to a
  custom component in a future release.

# Thanks and Sponsorships

Work funded in part by [Multi-Etch, LLC](https://www.multietch.com/).

**Consider [sponsoring me](https://github.com/sponsors/rootwork) and have your
name or logo included here!**

Built with original inspiration from
[dalefish/mjml-boilerplate-win](https://github.com/dalefish/mjml-boilerplate-win).

Thanks, of course, to the folks working on
[mjmlio/mjml](https://github.com/mjmlio/mjml). You are the light in the terrible
email-HTML darkness.

# License

GPLv3. See [LICENSE](LICENSE).
