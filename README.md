A quick-start boilerplate setup for those writing email code in
[MJML](https://mjml.io/), the email templating language, and using Sublime Text
3. With inspiration from
[dalefish/mjml-boilerplate-win](https://github.com/dalefish/mjml-boilerplate-win).

# Prerequisites

This assumes you're running Sublime Text 3 on Linux and running Bash or ZSH, but
most of it should work under other conditions, or at least give you a good
starting point.

# Setup

* Clone this repo and `cd` into it.
* Install [mjml](https://www.npmjs.com/package/mjml) globally using node:
`sudo npm install -g mjml`
* `cp MJML.sublime-build ~/.config/sublime-text-3/Packages/User`
* Open Sublime 3
  * Install MJML-syntax for Sublime 3.
  * In the Tools menu, make sure "Save All on Build" is checked.
  * Tools > Build System > MJML
* `cp -r _boilerplate EMAILNAME`

# Usage

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