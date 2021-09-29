# Premail

![Checks](https://img.shields.io/github/checks-status/premail/premail/main.svg?style=flat-square)
[![Node ^12.22.1](https://img.shields.io/badge/node-%5E12.22.1-brightgreen.svg?style=flat-square)](https://nodejs.org/en/download/)
[![MJML 4.0+ valid](https://img.shields.io/badge/mjml-4%2B-brightgreen.svg?style=flat-square)](https://github.com/mjmlio/mjml/releases)
[![Code style: JS Standard](https://img.shields.io/badge/code_style-standard-blue.svg?style=flat-square)](https://standardjs.com)
[![Code format: Prettier](https://img.shields.io/badge/code_format-prettier-blue.svg?style=flat-square)](https://github.com/prettier/prettier)

An easy-to-use build system for MJML, the email templating language, based on
Gulp and Handlebars.

---

[MJML](https://mjml.io/) is a markup language for writing bulletproof HTML
emails. It consciously does not incorporate a build process. This is one such
build process.

Premail uses Gulp (4) and Node for its build, Handlebars for templating, and
Sass for styling. You don't need to deal with any of those things directly,
beyond running a command in the terminal. Everything is defined in MJML
templates and YAML configuration files.

Email templates are all [valid](https://mjml.io/documentation/#validating-mjml)
under [MJML version 4](https://github.com/mjmlio/mjml/releases).

One `index.html` file will be rendered, as well as (optionally) a plain-text
version, ready to import into your emailer of choice.
[See an example of the default layout.](https://github.com/premail/premail/blob/v2.0.0/designs/_templates/dist/index.html)

<!-- The following section, from "ts" to "te", is an automatically-generated
  table of contents, updated whenever this file changes. Do not edit within
  this section. -->
<!-- prettier-ignore-start -->

<!--ts-->
* [Premail](#premail)
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
   * [Custom components](#custom-components)
      * [MJML List](#mjml-list)
      * [MJML Signoff](#mjml-signoff)
   * [Automatic code formatting and linting](#automatic-code-formatting-and-linting)
* [Full list of options](#full-list-of-options)
* [Known issues](#known-issues)
* [Thanks and Sponsorships](#thanks-and-sponsorships)
* [License](#license)

<!-- Added by: runner, at: Wed Sep 29 19:51:26 UTC 2021 -->

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
designs from the command-line. The tools included will make creating and
managing the code files for your emails vastly simpler.

When you're done, you'll have an `index.html` file (and plain-text `index.txt`
file, if you've chosen the text option) that is optimized to render correctly in
[the vast majority of email systems and clients](https://mjml.io/faq#email-clients).
Then just drop the code from the file into your email service provider's system.

# Features

- MJMLv4-standard bulletproof code that will look its best across all email
  clients, reduced to the smallest possible size. CSS is inlined and HTML is
  minified as with all MJML, but we also add some extra checks, for instance, to
  make sure emojis are properly escaped and the file size doesn't hit Gmail's
  clipping limit.

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
  argue) Premail does a much better job than most email services at rendering
  it. While only a small number of your recipients will see the plain-text
  version,
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
  to prevent things like navigation menu items from being visible in a
  recipient's inbox.

Feel free to
[make suggestions for more enhancements!](https://github.com/premail/premail/issues)

# Setup

## Requirements

You need to have at least [Node](https://nodejs.org/en/download/) 12.x.

Premail has been tested up to 16.x and appears to work, with the caveat that
**if you want to be able to use the `watch` function you need to stay at
[Node 12.x](https://github.com/nodejs/Release#release-schedule)** because of a
[limitation in gulp](https://github.com/gulpjs/glob-watcher/issues/55). (This
means you'll see an unfortunate number of depreciation warnings upon
installation.) If you don't need to use `watch`, you can run Node LTS. I
recommend using [n](https://github.com/tj/n) or
[nvm](https://github.com/nvm-sh/nvm) if you're managing multiple versions of
Node.

## Installation

- Go to the [Releases](https://github.com/premail/premail/releases) page and
  grab the most recent stable version. Alternatively, you can simply fork this
  repo and clone it locally.
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
  normally need to edit this unless you are re-ordering the structure.
- `content`: This directory holds files that will _always_ change in each email
  -- the title, preview text, header/hero area and main body.
- `structure`: This directory holds files that may _sometimes_ change in each
  email -- top and bottom navigation menus, social media links, and the footer
  area.
- `theme`: In order to render bulletproof email code, MJML sets some styles
  directly on elements, and uses inlined CSS on others. To make it easier to
  quickly create a new design, or slightly alter an existing one, look at
  [`themeConfig.yaml`](designs/_templates/theme/themeConfig.yaml) in this
  folder. Here are all the most common styles for a design, which we then map
  automatically to the appropriate locations in MJML and CSS. If there are
  styles you want to add or change that you don't find listed in
  `themeConfig.yaml`, your next stop should be the included CSS files in this
  directory -- they are extensively commented to guide you. If the styles aren't
  in the CSS, as a last stop look at the `index.hbs` file in the root design
  directory to see what MJML is setting directly.
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
  [here's the rendered file](https://github.com/premail/premail/blob/v2.0.0/designs/_templates/dist/index.html)
  from the sample templates.

## Custom components

Premail includes some
[MJML custom components](https://documentation.mjml.io/#creating-a-component)
for common use cases.

[MJML List](https://github.com/premail/mjml-list/) and
[MJML Signoff](https://github.com/premail/mjml-signoff/) are also available
independently from Premail.

### MJML List

`<ul>` and `<li>` HTML elements can be used in HTML emails, but getting them to
render consistently
[takes a little work](https://www.litmus.com/blog/the-ultimate-guide-to-bulleted-lists-in-html-email/).
Included in premail is a shortcut for these elements.

**`<mj-list>`** replaces `<ul>`. Use it alongside
[`<mj-text>`](https://documentation.mjml.io/#mj-text) within
[`<mj-column>`](https://documentation.mjml.io/#mj-column). It takes the
following options:

| option                   | unit                                                                       | details                                                                      | default value                  |
| ------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------ |
| `background-color`       | color                                                                      | Applies to entire list                                                       | none                           |
| `border`                 | string ([border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)) | Applies to entire list                                                       | none                           |
| `border-top`             | string ([border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)) | Applies to entire list                                                       | none                           |
| `border-right`           | string ([border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)) | Applies to entire list                                                       | none                           |
| `border-bottom`          | string ([border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)) | Applies to entire list                                                       | none                           |
| `border-left`            | string ([border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)) | Applies to entire list                                                       | none                           |
| `border-radius`          | pixels                                                                     | Applies to entire list                                                       | none                           |
| `direction`              | `ltr`, `rtl`                                                               | [Language direction](https://www.w3.org/International/questions/qa-html-dir) | `ltr`                          |
| `inner-background-color` | color                                                                      | Applies to entire list                                                       | none                           |
| `padding`                | pixels                                                                     | Applies to entire list                                                       | none                           |
| `padding-top`            | pixels                                                                     | Applies to entire list                                                       | none                           |
| `padding-right`          | pixels                                                                     | Applies to entire list                                                       | none                           |
| `padding-bottom`         | pixels                                                                     | Applies to entire list                                                       | none                           |
| `padding-left`           | pixels                                                                     | Applies to entire list                                                       | none                           |
| `vertical-align`         | `top`, `middle`, `bottom`                                                  | Applies to entire list                                                       | `top`                          |
| `width`                  | pixels                                                                     | Applies to entire list                                                       | none (full width of container) |

**`<mj-li>`** replaces `<li>`. Use it inside `<mj-list></mj-list>`. It takes the
following options:

| option             | unit                                 | details                                 | default value                                                                                       |
| ------------------ | ------------------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `color`            | color                                | Applies to both bullet marker and text  | none (inherited from parent text style)                                                             |
| `bullet-color`     | color                                | Applies to bullet marker only           | none (inherited from `color`)                                                                       |
| `text-color`       | color                                | Applies to text only                    | none (inherited from `color`)                                                                       |
| `background-color` | color                                | Applies to list item                    | none                                                                                                |
| `font-family`      | string                               | Applies to list item                    | `Ubuntu, Helvetica, Arial, sans-serif` (from [`<mj-text>`](https://documentation.mjml.io/#mj-text)) |
| `font-size`        | pixels                               | Applies to list item                    | `13px` (from [`<mj-text>`](https://documentation.mjml.io/#mj-text))                                 |
| `font-style`       | string                               | Applies to list item                    | none                                                                                                |
| `font-weight`      | string                               | Applies to list item                    | none                                                                                                |
| `gutter`           | pixels                               | Distance between bullet marker and text | default set in [`themeConfig.yaml`](designs/_templates/theme/themeConfig.yaml)                      |
| `letter-spacing`   | pixels (negative allowed)            | Applies to list item                    | none                                                                                                |
| `line-height`      | number, pixels or percentage         | Applies to list item                    | none                                                                                                |
| `padding-right`    | pixels                               | Applies to list item                    | none                                                                                                |
| `padding-left`     | pixels                               | Applies to list item                    | none                                                                                                |
| `text-align`       | `left`, `center`, `right`, `justify` | Applies to list item                    | `left`                                                                                              |
| `text-decoration`  | string                               | Applies to list item                    | none                                                                                                |
| `text-transform`   | string                               | Applies to list item                    | none                                                                                                |
| `vertical-align`   | `top`, `middle`, `bottom`            | Applies to list item                    | `top`                                                                                               |

An example of this can be found in the default design's
[`content/body.hbs`](designs/_templates/content/body.hbs) template.

### MJML Signoff

Designed for the sign-off or signature section at the bottom of your email
content, `<mj-signoff>` is used in the
[`content/signoff.hbs`](designs/_templates/content/signoff.hbs) template and
allows you to easily include an image alongside your signature such as a photo
or logo, which is a common best practice in many types of emails.

Available options for this component include:

| option                | unit                      | details                                                                                                                                                                                                                                                                                                                                                                                                                                         | default value |
| --------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `closing`             | string                    | Optional closing, e.g. `Thank you,`                                                                                                                                                                                                                                                                                                                                                                                                             | none          |
| `name`                | string                    | Optional name, e.g. `John Q. Public`                                                                                                                                                                                                                                                                                                                                                                                                            | none          |
| `title`               | string                    | Optional title, e.g. `Wild and Crazy Guy`                                                                                                                                                                                                                                                                                                                                                                                                       | none          |
| `title2`              | string                    | Optional title line two, e.g. `ACME Corp.`                                                                                                                                                                                                                                                                                                                                                                                                      | none          |
| `title3`              | string                    | Optional title line three, e.g. `(202) 555-1212`                                                                                                                                                                                                                                                                                                                                                                                                | none          |
| `section-padding`     | pixels                    | Applies to entire element                                                                                                                                                                                                                                                                                                                                                                                                                       | `10px 0`      |
| `section-align`       | `left`, `center`, `right` | Alignment of element as a whole                                                                                                                                                                                                                                                                                                                                                                                                                 | `left`        |
| `background-color`    | color                     | Applies to entire element                                                                                                                                                                                                                                                                                                                                                                                                                       | none          |
| `image-position`      | `left`, `right`           | Where the image should appear relative to the text                                                                                                                                                                                                                                                                                                                                                                                              | `left`        |
| `image-padding`       | pixels                    | Applies only to the image column                                                                                                                                                                                                                                                                                                                                                                                                                | none          |
| `image-src`           | URL                       | Location of image                                                                                                                                                                                                                                                                                                                                                                                                                               | none          |
| `image-width`         | pixels                    | Width of image                                                                                                                                                                                                                                                                                                                                                                                                                                  | none          |
| `image-height`        | pixels                    | Height of image                                                                                                                                                                                                                                                                                                                                                                                                                                 | none          |
| `image-alt`           | string                    | Alternative text for image (you may legitimately wish to leave this blank; see [the spec for graphical representation](https://html.spec.whatwg.org/multipage/images.html#a-graphical-representation-of-some-of-the-surrounding-text), [decorative images](https://html.spec.whatwg.org/multipage/images.html#a-purely-decorative-image-that-doesn't-add-any-information) and [example 2 here](https://webaim.org/techniques/alttext/#context)) | none          |
| `text-column-padding` | pixels                    | Applies only to the text column                                                                                                                                                                                                                                                                                                                                                                                                                 | `0 10px`      |

Strings cannot contain HTML elements, however any content within the element
itself is placed in the text column below the optional strings, and there are
styling options in the theming configuration. The default `content/signoff.hbs`
template demonstrates each of these.

As an alternative to this component, you can use the
[`<mj-group>`](https://documentation.mjml.io/#mj-group) element, but note its
warning for iOS 9.

If you are not using an image in your sign-off, you can simply use the default
`<mj-text>` element in the `content/signoff.hbs` template.

## Automatic code formatting and linting

Premail includes [sheerun/modern-node](https://github.com/sheerun/modern-node),
which formats and lints code using [Prettier](https://prettier.io/). This will
warn you about errors in the HTML, Sass or CSS syntax of your designs or emails,
and auto-format your files on every build and git commit.

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
│   ├── loadConfig
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
│   ├── loadConfig
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
│   ├── loadConfig
│   ├── formatTemplates
│   ├─┬ <parallel>
│   │ ├── build.content
│   │ └── build.styles
│   ├── build.render
│   └── watchEmail
├── formatTemplates  Format templates with Prettier.
├── clean.generated  Remove generated files from the current design or email.
├── loadConfig       Load the current configuration being used to render your email. To print to the console, use with --debug
├── listTemplates    List all templates that will be processed. Use with --debug
└── test             Run an empty gulp function for testing.
```
<!-- --><!-- /markdown-exec -->
<!-- prettier-ignore-end -->

# Known issues

- None currently! If you have one to report,
  [head over here](https://github.com/premail/premail/issues/new)

# Thanks and Sponsorships

Work funded in part by [Multi-Etch, LLC](https://www.multietch.com/).

**Consider [sponsoring rootwork](https://github.com/sponsors/rootwork),
premail's developer, and have your name or logo included here!**

Built with original inspiration from
[dalefish/mjml-boilerplate-win](https://github.com/dalefish/mjml-boilerplate-win).

Thanks, of course, to the folks working on
[mjmlio/mjml](https://github.com/mjmlio/mjml). You are the light in the terrible
email-HTML darkness.

# License

GPLv3. See [LICENSE](LICENSE).
