A quick-start setup for those writing email code in [MJML](https://mjml.io/),
the email templating language. With inspiration from
[dalefish/mjml-boilerplate-win](https://github.com/dalefish/mjml-boilerplate-win).

The templates included are
[valid](https://mjml.io/documentation/#validating-mjml) under
[MJML version 4](https://github.com/mjmlio/mjml/releases).

One `index.html` file will be rendered, ready to import into your emailer of
choice.

# Overview

If you're here, you are probably already familiar with MJML, but if not you
should [read a little about it](https://documentation.mjml.io) first.

The structure of this is such you should use it to contain all of your email
projects within a single design.

For instance, if you're a freelancer, you'd fork this project once each for
Company A and Company B, and place each individual email as a subdirectory
inside the company directories. For more information, see the Notes section at
the bottom.

We take advantage of MJML's `mj-class` option to gather all of the styles in one
place, and let MJML take care of all the inlining.

The build scripts assume you're running Bash or ZSH in some form. There are some
extra tools for Sublime Text 3 users.

# Setup

* Go to the [Releases](releases) page and grab the most recent stable version.
Download and extract it to the location of your choice. Alternatively, if you're
going to be keeping your newsletters in a repo, you can simply fork this one,
rename it as needed, and clone it locally.
* Install [mjml](https://www.npmjs.com/package/mjml) globally using node:
`npm install -g mjml`

## If you have Sublime Text 3

* Copy the Sublime build file into your configuration:
  * Linux: `cp MJML.sublime-build ~/.config/sublime-text-3/Packages/User`
  * Mac: `cp MJML.sublime-build ~/Library/Application Support/Sublime Text 3/Packages/User`
  * Windows: `cp MJML.sublime-build %APPDATA%\Sublime Text 3/Packages/User`
* Open Sublime Text
  * Install the Package
  [MJML-syntax](https://packagecontrol.io/packages/MJML-syntax).

# Usage

## Creating a new design

Run setup above, and rename your fork of the repo with your design or company's
name.

Edit the contents of `_templates` to fit your design that will be in place for
each email.

* `index.mjml`: This file includes all the component files. You shouldn't
normally need to edit this unless you are re-ordering the structure or changing
the `lang` value.
* `content`: This folder holds files that will *always* change in each email
-- the title, preview text, header/hero area and main body.
* `structure`: This folder holds files that may *sometimes* change in each
email -- top and bottom navigation menus, social media links, and the footer
area.
* `style`: This folder contains the CSS attributes that, ideally, *will not*
change from project to project.

In your console, run `./mjml-watch.sh`. This will watch for any changes in any
`index.mjml` files (including any partials referenced with `<mj-include>`), and
re-render `index.html` in default (unminified) form. You can leave your browser
open to this page.

By default,
[watch output includes MJML depreciation notices](https://github.com/mjmlio/mjml/issues/2205);
if these bother you, you can turn off errors by running
`./mjml-watch.sh &> /dev/null` instead, but this means you won't get rebuild
notifications in your console either.

### Sublime Text 3 users

Sublime should auto-detect the build-system based on your files, but you can
check by going to Tools > Build System > MJML

Be sure that in the Tools menu, "Save All on Build" is checked (which is the
default).

## Creating a new email from an existing design

1. Once you have a standard design, copy the `_templates` directory and give it
a name for a specific email.
2. Edit the `.mjml` files as necessary for this individual email.
3. Use the build or watch options above to recompile into an `index.html` file
you can import into your email sender of choice.

## Rendering the email for production

In your console, run `./mjml-build.sh`. This will render `index.html`
[in minified form](https://github.com/mjmlio/mjml/blob/master/packages/mjml-cli/README.md#minify-and-beautify-the-output-html).

Images can be included locally while you're drafting the email, but MJML doesn't
do anything magical in terms of hosting these images -- you'll still have to
upload them somewhere and change the references to the hosted images.

Once the production email is rendered, you can:

* import directly (as HTML) into your emailer of choice
* share the `index.html` file with colleagues
* upload the file as part of a repo and use something like
[GitHub Pages](https://pages.github.com/) to view/share it in a browser

### Sublime Text 3 users

Press <kbd>Ctrl-B</kbd> to run the build script.

# Notes on project structure

This project is designed to become your overarching directory in which
individual email projects with a single design are kept in subdirectories. The
script included looks for `index.mjml` files in the current directory and any
first-order subdirectories, and renders them in place to corresponding
`index.html` files.

Generally this isn't a huge problem: Should re-rendered older projects change
somehow (for instance through new versions of MJML itself), you can simply
choose to not commit the changed files, because you're using version-control.

However, it may introduce issues of scale, if you have a directory with hundreds
of email projects all getting re-rendered on `watch` or `build`.

If that worries you or is becoming an issue, just use a separate directory for
each project, re-forking this project for every new one.

# Known issues

* Currently comments are not being stripped from minified files
[due to a bug in mjml-cli](https://github.com/mjmlio/mjml/issues/2206#issuecomment-797352320).
The build script does specify that comments should be stripped, so once MJML
fixes this the issue will resolve itself.

* The `signoff.mjml` template, used for a signature or closing with a person's
image, uses a regular `<img>` tag with inline styles. This will be moved to a
custom component in a future release.

# License

GPLv3. See [LICENSE](LICENSE).
