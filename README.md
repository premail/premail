A quick-start boilerplate setup for those writing email code in
[MJML](https://mjml.io/), the email templating language, and using Sublime Text
3. With inspiration from
[dalefish/mjml-boilerplate-win](https://github.com/dalefish/mjml-boilerplate-win).

# Prerequisites

This assumes you're running Sublime Text 3 and running Bash or ZSH in some form,
but most of it should work under other conditions, or at least give you a good
starting point.

# Setup

* Clone this repo and `cd` into it.
* Install [mjml](https://www.npmjs.com/package/mjml) globally using node:
`npm install -g mjml`
* Copy the Sublime build file into your configuration:
  * Linux: `cp MJML.sublime-build ~/.config/sublime-text-3/Packages/User`
  * Mac: `cp MJML.sublime-build ~/Library/Application Support/Sublime Text 3/Packages/User`
  * Windows: `cp MJML.sublime-build %APPDATA%\Sublime Text 3/Packages/User`
* Open Sublime 3
  * Install the Package "MJML-syntax".

# Usage

* Create a project folder (or subfolder of your copy of this repo) with a name
for your email project.
* Copy the contents of `_boilerplate` into your project folder.
* Open your project folder in Sublime Text 3.
  * Sublime should auto-detect the build-system based on your files, but you can
  check by going to Tools > Build System > MJML
  * Also be sure that in the Tools menu, "Save All on Build" is checked
  (default).
  * Edit the `.mjml` files in your email project directory.
  * At any time, press Ctrl-B to render `index.html`.
* View `index.html` in browser.

# Notes

The script iterates from the project directory down to any `index.mjml` files
it encounters in first-order subdirectories. This means all `index.mjml` files
are getting re-built, which will obviously introduce issues of scale. (Should
`mjml` rendering change, such as with newer versions, you can simply not commit
changed `index.html` files back to the repo.) This is done so that every email
project doesn't require its own repo, acknowledging this trade-off.