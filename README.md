A quick-start boilerplate setup for those writing email code in
[MJML](https://mjml.io/), the email templating language, and using Sublime Text
3. With inspiration from
[dalefish/mjml-boilerplate-win](https://github.com/dalefish/mjml-boilerplate-win).

# Prerequisites

This assumes you're running Sublime Text 3 and running Bash or ZSH in some form,
but most of it should work under other conditions, or at least give you a good
starting point.

The design of this is such that you should fork it, and then use it to contain
all of your email-code projects (though see note at bottom).

# Setup

* Fork this repo, clone it locally and `cd` into it.
* Install [mjml](https://www.npmjs.com/package/mjml) globally using node:
`npm install -g mjml`
* Copy the Sublime build file into your configuration:
  * Linux: `cp MJML.sublime-build ~/.config/sublime-text-3/Packages/User`
  * Mac: `cp MJML.sublime-build ~/Library/Application Support/Sublime Text 3/Packages/User`
  * Windows: `cp MJML.sublime-build %APPDATA%\Sublime Text 3/Packages/User`
* Open Sublime 3
  * Install the Package
  [MJML-syntax](https://packagecontrol.io/packages/MJML-syntax).

# Usage

1. Create a project folder (or subfolder of your copy of this repo) with a name
for your email project.
2. Copy the contents of `_boilerplate` into your project folder.
3. Open your project folder in Sublime Text 3.
   a. Sublime should auto-detect the build-system based on your files, but you can
   check by going to Tools > Build System > MJML
   b. Also be sure that in the Tools menu, "Save All on Build" is checked
   (default).
   c. Edit the `.mjml` files in your email project directory.
   d. At any time, press Ctrl-B to render `index.html`.
4. View `index.html` in browser.

# Notes

This project is designed to become your overarching directory in which
individual email projects are kept in subdirectories. The script included looks
for `index.mjml` files in the current directory and any first-order
subdirectories, and renders them in place to corresponding `index.html` files.

Generally this isn't a huge problem: Should re-rendered older projects change
somehow (for instance through new versions of `mjml` itself), you can simply
choose to not commit the changed files, because you're using version-control.

However, it may introduce issues of scale, if you have a directory with hundreds
of email projects all getting re-rendered every time you hit Ctrl-B.

If that worries you, just use a separate directory for each project, re-cloning
this project for every new one.