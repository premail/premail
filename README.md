<!-- NOTE:

     This readme includes documentation from various parts of the Premail
     documentation site, <https://premail.dev>

     Any updates to this file should be reflected in the corresponding areas
     of the documentation site as necessary.

-->

<h1 align="center">
  <a href="https://github.com/premail/premail">
    <img src="https://raw.githubusercontent.com/premail/premail/main/docs/images/logo.svg" alt="Premail" width="500" height="250">
  </a>
</h1>

<div align="center">
  <strong>Premail is an easy-to-use component-based build system for MJML, the
    email templating language, with Handlebars templating, Sass styles, and
    extra options.</strong>
  <br /><br />
  <a href="https://premail.dev">Read the Documentation</a>
  -
  <a href="https://github.com/premail/premail/issues/new?assignees=&labels=Type%3A+Bug&template=01_bug_report.yml">Report a Bug</a>
  -
  <a href="https://github.com/premail/premail/issues/new?assignees=&labels=Type%3A+Feature&template=02_feature_request.yml">Request a Feature</a>
  -
  <a href="https://github.com/premail/premail/issues/new?assignees=&labels=Type%3A+Question&template=03_support_question.yml">Ask a Question</a>
</div>

<div align="center">
<br />

[![License: AGPL-3.0+](https://img.shields.io/badge/license-%20AGPL-blue?style=flat-square&logo=gnu)](https://github.com/premail/premail/blob/main/LICENSE)
[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/premail/premail/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22%2C%22Status%3A+Available%22+sort%3Aupdated-desc+)

[![Release Date](https://img.shields.io/github/release-date/premail/premail?style=flat-square)](https://github.com/premail/premail/releases/latest)
[![Node ^12.22.1](https://img.shields.io/badge/node-%5E12.22.1-brightgreen.svg?style=flat-square)](https://nodejs.org/en/download/)
[![MJML 4.0+ valid](https://img.shields.io/badge/mjml-4%2B-brightgreen.svg?style=flat-square)](https://github.com/mjmlio/mjml/releases)
[![Code style: JS Standard](https://img.shields.io/badge/code_style-standard-blue.svg?style=flat-square)](https://standardjs.com)
[![Code format: Prettier](https://img.shields.io/badge/code_format-prettier-blue.svg?style=flat-square)](https://github.com/prettier/prettier)

[![Twitter: @premaildev](https://img.shields.io/badge/Twitter-%40premaildev-%231da1f2?style=flat-square)](https://twitter.com/premaildev)
[![Coded with love by rootwork](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-rootwork-ff1414.svg?style=flat-square)](https://github.com/sponsors/rootwork)

</div>

---

[MJML](https://mjml.io/) is a markup language for writing bulletproof HTML
emails. It intentionally doesn't include a build process. This is that build
process, and it's configurable to meet your needs and catch the edge cases.

Premail is component-based, and uses Handlebars for templating. Settings are
defined in YAML configuration files, and theming happens in a design
configuration file as well as (optionally) Sass files.

Email templates are all [valid](https://documentation.mjml.io/#validating-mjml)
under [MJML version 4](https://github.com/mjmlio/mjml/releases).

One `index.html` file will be rendered, as well as (optionally) a plain-text
version, ready to import into your emailer of choice.
[See an example of the default layout.](https://refined-github-html-preview.kidonng.workers.dev/premail/premail/raw/main/src/scaffolding/project/designs/_default/dist/index.html)

Read more at
**[a quick introduction to Premail](https://premail.dev/docs/introduction-to-premail/)**.

---

<!-- The following section, from "ts" to "te", is an automatically-generated
  table of contents, updated whenever this file changes. Do not edit within
  this section. -->
<!-- prettier-ignore-start -->

<!--ts-->
* [Features](#features)
   * [Custom MJML components](#custom-mjml-components)
* [Setup and usage](#setup-and-usage)
   * [Installation](#installation)
   * [Quickstart](#quickstart)
   * [CLI options](#cli-options)
* [Project information](#project-information)
   * [Documentation](#documentation)
   * [Roadmap](#roadmap)
   * [Getting support](#getting-support)
   * [Helping out](#helping-out)
   * [Contributing](#contributing)
   * [Security](#security)
* [Thanks and Sponsorships](#thanks-and-sponsorships)
* [License](#license)

<!-- Added by: runner, at: Tue Mar 22 01:10:46 UTC 2022 -->

<!--te-->
<!-- prettier-ignore-end -->

---

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

- A plain-text version of your email is optionally created, and Premail does a
  much better job than most email services at rendering it. While only a small
  number of your recipients will see the plain-text version,
  [they are important for email deliverability](https://www.litmus.com/blog/best-practices-for-plain-text-emails-a-look-at-why-theyre-important/).
  Within the plain-text version options, you can control whether certain
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
  [proper image `alt` tags](https://help.siteimprove.com/support/solutions/articles/80000863904)
  and making sure the supplied text doesn't break email code parsers.
- [Padding preview/preheader text](https://www.goodemailcode.com/email-code/preheader)
  to prevent things like navigation menu items from being visible in a
  recipient's inbox.

Feel free to
[make suggestions for more enhancements!](https://github.com/premail/premail/issues/new?assignees=&labels=Type%3A+Feature&template=02_feature_request.yml)

## Custom MJML components

Premail also includes some
[MJML custom components](https://documentation.mjml.io/#creating-a-component)
for common use cases:

- **[MJML Bullet List](https://premail.dev/docs/components/mjml-bullet-list/)**
- **[MJML Signoff](https://premail.dev/docs/components/mjml-signoff/)**

# Setup and usage

Premail requires Node 12.x or 14.x to run. See the
[Premail setup documentation for details](https://premail.dev/docs/overview/setting-up-premail/).

## Installation

`npm install -g premail`

That's it! See
[setting up Premail](https://premail.dev/docs/overview/setting-up-premail/) for
additional installation options.

## Quickstart

- Install Premail (above).
- Create an emtpy directory and enter it on the command line.
- Run `premail init`. This generates the Premail scaffolding and includes an
  example design and email source.
- Run `premail build -e _example`. This builds the example email.
- Take a look at `emails/_example/dist` to see the built HTML and plain text
  versions of the email.

Head over to the
[Premail Usage Guide](https://premail.dev/docs/overview/usage/create-new-premail-project/)
to start learning about how to use Premail with your own designs and emails.

## CLI options

You can run `premail -h` to see the full list of options:

<!-- The following section is automatically-generated. Do not edit. -->
<!-- prettier-ignore-start -->
<!-- markdown-exec(cmd:echo '<'!'-- '-'->\n```' && ./index.js -h | sed "s/index\.js/premail/g" && echo '```\n<'!'-- '-'->') --><!-- -->
```
Usage: premail <command> [options]

Commands:
  premail new <email|design> <dest>  Create a new email or design in <dest>
  premail build                      Build an email
  premail watch                      Watch design and configuration files and
                                      rebuild as necessary
  premail clean                      Remove generated files from the current
                                      design or email
  premail paths                      List paths being used with the current
                                      configuration and command-line flags
  premail format                     Format templates with Prettier
  premail init                       Initialize a Premail project
  premail destroy                    Destroy this Premail project

Email development:
  -d, --design    Specify design directory to use [string] [default: "_default"]
  -e, --email     Specify email directory to use                        [string]
  -p, --prod      Render production files (minified, no comments)      [boolean]
  -s, --noserve   Disable serving rendered email via browserSync       [boolean]
  -f, --noformat  Disable auto-formatting of files using Prettier      [boolean]
      --debug     Append to any command to see verbose details         [boolean]

Design development:
      --temp  Include intermediate rendered template (post-Handlebars, pre-MJML)
              in output                                                [boolean]

New emails and designs:
  -d, --design  Specify design directory to use   [string] [default: "_default"]
  -e, --email   Specify email directory to use                          [string]

More information:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Additional documentation: https://premail.dev
```
<!-- --><!-- /markdown-exec -->
<!-- prettier-ignore-end -->

# Project information

## Documentation

Detailed documentation and guides are available at **<https://premail.dev>**.

## Roadmap

See the [open issues](https://github.com/premail/premail/issues) for a list of
proposed features and known issues, and
[projects](https://github.com/premail/premail/projects?type=beta&query=is%3Aopen)
to see them grouped by major release.

- [Top feature requests](https://github.com/premail/premail/issues?q=label%3A%22Type%3A+Feature%22+is%3Aopen+sort%3Areactions-%2B1-desc)
  (Add your votes using the 👍 reaction)
- [Top bugs](https://github.com/premail/premail/issues?q=is%3Aissue+is%3Aopen+label%3A%22Type%3A+Bug%22+sort%3Areactions-%2B1-desc)
  (Add your votes using the 👍 reaction)
- [Newest bugs](https://github.com/premail/premail/issues?q=is%3Aopen+is%3Aissue+label%3A%22Type%3A+Bug%22)

Premail's [changelog](CHANGELOG.md) includes unreleased features and fixes, in
addition to recording what changed in each past release.

## Getting support

<!-- Note this is replicated at
     https://premail.dev/docs/support-project-help/
     so be sure to update it there as well. -->

**[Ask a support question](https://github.com/premail/premail/issues/new?assignees=&labels=Type%3A+Question&template=03_support_question.yml)**
on GitHub if you're stuck.

## Helping out

If you want to say **thank you** and support active development of Premail:

- 🌟 Add a [GitHub Star](https://github.com/premail/premail) to the project.
- Tweet about Premail ([@premaildev](https://twitter.com/premaildev) on
  Twitter).
- Consider [sponsoring rootwork](https://github.com/sponsors/rootwork),
  Premail's developer, and have
  [your name or logo included here](https://premail.dev/sponsors/)!
- Blog about the project. We love reviews, and are eager to hear ways we could
  make things even better.

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make
the open-source community such an amazing place to learn, inspire, and create.
Any contributions you make will benefit everybody else and are **greatly
appreciated**.

Please read
[our contribution guidelines](https://github.com/premail/premail/tree/main/docs/CONTRIBUTING.md),
and thank you for being involved!

## Security

Legalese: Premail is provided **"as is"** without any warranty. Use at your own
risk.

_For more information and to report security issues, please refer to our
[security documentation](https://github.com/premail/premail/tree/main/docs/SECURITY.md)._

# Thanks and Sponsorships

<a href="https://www.multietch.com/"><img src="https://raw.githubusercontent.com/premail/premail/main/docs/images/sponsors/multietch.jpg" alt="Multi-Etch" width="75" height="75" align="left"></a>Work
funded in part by <a href="https://www.multietch.com/">Multi-Etch,
LLC</a>.<br />

**Consider [sponsoring rootwork](https://github.com/sponsors/rootwork),
Premail's developer, and have your name or logo included here!**

<!-- The following section is automatically-generated. Do not edit. -->
<!-- prettier-ignore-start -->
<!-- sponsors --><!-- sponsors -->
<!-- prettier-ignore-end -->

Premail is built on all sorts of open-source code.
[Our appreciation to all of these fine projects](https://premail.dev/appreciation/)!

# License

**Premail itself** is licensed under the GNU Affero General Public License v3.0
or later. To be clear: This license only covers Premail, _not_ any content you
generate _using_ Premail. Those files are yours to do with as you wish, and you
need not share them, much less license them, in any particular way.

For the legal details of the AGPL, see the complete
[LICENSE](https://github.com/premail/premail/blob/main/LICENSE).

The **[Premail.dev](https://premail.dev) website**, meanwhile, is licensed under
a
[Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
