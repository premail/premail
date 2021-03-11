#!/bin/bash
# Uses MJML (node) on any `index.mjml` files in first-level subdirectories to
# watch and render the resulting `index.html` files in-place. MJML's `watch`
# builds a dependency tree of MJML partials, so this _will_ run as long as your
# `index.mjml` file includes them.

for file in $(find . -maxdepth 2 -type f -name "index.mjml") ; do
  dir=$(dirname "$file")
  mjml -w "$file" --config.beautify false -o "$dir"/index.html
done