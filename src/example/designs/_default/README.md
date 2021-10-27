# Design: Default

This directory contains the files for the design "Default". An individual design
is made up of both markup and theme settings.

## Markup

Markup files are primarily
[MJML code](https://documentation.mjml.io/#components), with Handlebars used for
templating. When your project is compiled, the Handlebars processing comes
first, and so these files have the `.hbs` Handlebars extension. In most cases,
though, all you'll need to know is MJML.

- `index.hbs`: This is the master file that loads each of the components
  (`content` and `structure`) for your email. Usually, you won't need to edit
  this file unless you want to re-order the components themselves.
- `content`: This directory holds files that will _always_ change in each email
  -- the title, preview text, header/hero area and main body.
- `structure`: This directory holds files that may _sometimes_ change in each
  email -- top and bottom navigation menus, social media links, and the footer
  area. Depending on how you prefer to create your designs, you might opt to
  never change these components in a given design.

## Theme

The `theme` subdirectory contains two sets of files: Configuration and styles.

- `theme/themeConfig.yaml` controls settings for your design's theme. In order
  to render bulletproof email code, MJML sets some styles directly on elements,
  and uses inlined CSS on others. To make it easier to quickly create a new
  design, or slightly alter an existing one, this file lists the most common
  styles for a design, which are then mapped automatically to the appropriate
  locations in MJML and CSS. If there are styles you want to add or change that
  aren't listed here, your next step should be the Sass files.
- `*.scss` files are [Sass files](https://sass-lang.com/guide) that make
  individual changes to CSS. If you're not familiar with Sass, the `scss` syntax
  used here is
  [a superset of CSS](https://sass-lang.com/documentation/syntax#scss) -- so any
  valid CSS can be placed in these files. If you peruse them, you'll see that
  they use Sass to import variables from your theme configuration, but you can
  ignore or overwrite these styles if you wish. The Sass files are heavily
  commented to make it clear which styles they control.
- `*.hbs` files are Handlebars files with MJML markup that load settings from
  `themeConfig.yaml` into MJML itself. If you have a style that you can't seem
  to change, check these files. They are included in the `index.hbs` file
  automatically.

Finally, note that some attributes must be set on `<mj-wrapper>` elements for
each component directly in the `index.hbs` file. In every case, these are
loading settings from `themeConfig.yaml`, so it should be easiest to change
styles there -- but if you need to alter or add something like a CSS class, take
a look at what's being defined in `index.hbs`.
