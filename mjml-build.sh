#!/bin/bash
# Runs MJML (node) on any `index.mjml` files in subdirectories

for file in $(find . -maxdepth 2 -type f -name "index.mjml") ; do
  dir=$(dirname "$file")
  mjml -r "$file" --config.beautify false --config.minify true -o "$dir"/index.html
done