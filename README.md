# MJML Quickstart

![Checks](https://img.shields.io/github/checks-status/rootwork/mjml-quickstart/main.svg?style=flat-square)
[![Node ^10.23.2](https://img.shields.io/badge/node-%5E10.23.2-brightgreen.svg?style=flat-square)](https://nodejs.org/en/download/)
[![MJML 4.0+ valid](https://img.shields.io/badge/mjml-4%2B-brightgreen.svg?style=flat-square)](https://github.com/mjmlio/mjml/releases)
[![Code style: JS Standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A quick-start setup for those writing email code in [MJML](https://mjml.io/),
the email templating language, using Node and Gulp.

The templates included are
[valid](https://mjml.io/documentation/#validating-mjml) under
[MJML version 4](https://github.com/mjmlio/mjml/releases).

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
   * [Requirements](#requirements)
* [Setup](#setup)
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

<!-- Added by: runner, at: Tue May 11 02:05:15 UTC 2021 -->

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
designs. The resulting `index.html` file (and plain-text `index.txt` file, if
you've chosen the text option) is optimized to render correctly in
[the vast majority of email systems and clients](https://mjml.io/faq#email-clients).
When you're done, just drop the code from the file into your email service
provider's system.

## Requirements

You need to have at least [Node](https://nodejs.org/en/download/) 10.23.2. This
tool uses
[Gulp](https://gulpjs.com/docs/en/getting-started/quick-start) 4.0.2+ and
[MJML](https://github.com/mjmlio/mjml/releases) 4.9.3+, but these are installed
automatically during setup, so it's only important to check these if you already
have them installed.

# Setup

- Go to the [Releases](https://github.com/rootwork/mjml-quickstart/releases)
  page and grab the most recent stable version. Alternatively, you can simply
  fork this repo and clone it locally.
- Remove the `.github` folder if you are using your own GitHub repo and don't
  want [GitHub Actions](https://docs.github.com/en/actions) running on it.
- Install with `npm i`
- MJML has [plugins](https://documentation.mjml.io/#applications-and-plugins)
  for Visual Studio Code, Atom, and Sublime Text 3.

# Usage

Run `gulp --tasks` if you want to see all of the options quickly, or skip down
to the [full list of options](#full-list-of-options).

## Setting options

Look at the [`config.yaml`](config.yaml) file at the root of the project.

Here you'll find options for setting the names of your `designs` and `emails`
directories, which will hold individual designs and emails, respectively. You
can also change the name of the master template file, and what types of files
(`.tpl`, by default) the tool processes as templates.

Under "Email-building options," you'll see preferences you can set on the
rendered emails: Whether to generate a plain-text version, and options on what
to include in that version.

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

- `index.tpl`: This file includes all the component files. You shouldn't
  normally need to edit this unless you are re-ordering the structure or
  changing the `lang` value.
- `content`: This directory holds files that will _always_ change in each email
  -- the title, preview text, header/hero area and main body.
- `structure`: This directory holds files that may _sometimes_ change in each
  email -- top and bottom navigation menus, social media links, and the footer
  area.
- `theme`: This directory contains the CSS attributes that, ideally, _will not_
  change from project to project.
- `dist`: This directory contains the output `index.html` (and optionally a
  plain-text `index.txt` file) for you to use.

In your console, run `gulp watch` with the `-d` option, followed by the
directory name of your design. Using the example above with a design named
"postmodern", you'd run `gulp watch -d postmodern`.

This will watch for any changes in any `index.tpl` files (including any
partials referenced with `<mj-include>`), and re-render the `index` files in
unminified form in the `dist` subdirectory of your design. You can leave a web
browser open to this page.

If you don't want to continuously watch your files, use `gulp build`, or just
`gulp` instead. Again using the "postmodern" example, that would be
`gulp build -d postmodern`. This will create the `index` files and then stop.

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

- import directly (as HTML) into your emailer of choice
- share the `index` files with colleagues
- upload the file as part of a repo and use something like
  [GitHub Pages](https://pages.github.com/) to view/share it in a browser; for
  instance
  [here's the rendered file](https://rootwork.github.io/mjml-quickstart/designs/_templates/dist/index.html)
  from the sample templates
- use the `index.txt` plain-text version, if you've chosen to have one created,
  in the appropriate place provided by your emailer

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
                                  Options:
                                    --prod: Render production files (minified, no comments).
                                    -d:     Specify design folder to use. (Default: _templates)
                                    -e:     Specify email folder to render.
│ └─┬ <series>
│   ├── showConfig
│   ├── cleanTemp
│   ├── cleanGen
│   ├── buildStyles
│   ├── formatTemplates
│   ├── buildTemplates
│   ├── buildHTML
│   ├── buildText
│   └── cleanTemp
├─┬ build            Render a complete HTML email based on design and email templates.
                                  Options:
                                    --prod: Render production files (minified, no comments).
                                    -d:     Specify design folder to use. (Default: _templates)
                                    -e:     Specify email folder to render.
│ └─┬ <series>
│   ├── showConfig
│   ├── cleanTemp
│   ├── cleanGen
│   ├── buildStyles
│   ├── formatTemplates
│   ├── buildTemplates
│   ├── buildHTML
│   ├── buildText
│   └── cleanTemp
├─┬ watch            Watch both design and template files and rebuild (formatted, with comments) as necessary.
│ └─┬ <parallel>
│   ├── watchStyles
│   ├── watchHTML
│   └── watchText
├─┬ clean            Remove all generated and temporary files from the current design or email.
│ └─┬ <parallel>
│   ├── cleanTemp
│   └── cleanGen
├── buildStyles      Build CSS files from Sass files in the "theme" folder.
├── buildTemplates   Build MJML templates from Handlebars templates.
├── buildHTML        Build HTML files from MJML templates.
├── buildText        Generate a plain-text version of the email.
├── watchStyles      Watch Sass and rebuild CSS files on changes.
├── watchHTML        Watch templates and rebuild HTML files on changes.
├── watchText        Watch rendered HTML file and rebuild plain-text version on changes.
├── formatTemplates  Format MJML templates with Prettier.
├── cleanTemp        Remove temporary files from the current design or email.
├── cleanGen         Remove generated files from the current design or email.
├── showConfig       Display the current configuration being used when rendering your email files.
└── listTemplates    List all templates that will be processed. Useful for debugging.
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
