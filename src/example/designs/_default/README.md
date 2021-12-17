# Design: Default

This directory contains the files for the design "Default". Individual designs
contain markup, styles, and settings.

## Markup

Markup files are primarily
[MJML code](https://documentation.mjml.io/#components), with Handlebars used for
templating. When your project is compiled, the Handlebars processing comes
first, and so these files have the `.hbs` Handlebars extension. In most cases,
though, all you'll need to know is MJML.

- `index.hbs`: This is the primary file that loads each of the components
  (`content` and `structure`) for your email. Usually, you won't need to edit
  this file unless you want to re-order the components themselves.
- `designConfig.yaml` controls settings for your design. In order to render
  bulletproof email code, MJML sets some styles directly on elements, and uses
  inlined CSS on others. To make it easier to quickly create a new design, or
  slightly alter an existing one, this file lists the most common styles for a
  design, which are then mapped automatically to the appropriate locations in
  MJML and CSS. If there are styles you want to add or change that aren't listed
  here, your next step should be the Sass files in `theme`.
- `content`: This directory holds files that will _always_ change in each email
  -- the title, preview text, header/hero area and main body -- and will usually
  be overridden by the `content` components in emails built with this design.
  The files here will only be used when a) an email does not define the same
  file, or b) when building the design itself (i.e. designing the design).
- `structure`: This directory holds files that may _sometimes_ change -- top and
  bottom navigation menus, social media links, and the footer area. Depending on
  how you prefer to create your designs, you might opt to never change these
  components in a given design. If and when these same files exist in an email,
  they will be overridden by that email.
- `dist`: This directory holds the built version of the design.

## Theme

The `theme` subdirectory contains styles as well as design-specific markup.

- `*.scss` files are [Sass files](https://sass-lang.com/guide) that make
  individual changes to CSS. If you're not familiar with Sass, the `scss` syntax
  used here is
  [a superset of CSS](https://sass-lang.com/documentation/syntax#scss) -- so any
  valid CSS can be placed in these files. If you read through them, you'll see
  that they use Sass to import variables from your design configuration, but you
  can ignore or overwrite these styles if you wish. The Sass files are heavily
  commented to make it clear which styles they control.
- `*.hbs` files are Handlebars files with MJML markup that load settings from
  `designConfig.yaml` into MJML itself. If you have a style that you can't seem
  to change, check these files. They are included in the `index.hbs` file
  automatically.

Finally, note that some attributes must be set on `<mj-wrapper>` elements for
each component directly in the `index.hbs` file. In every case, these are
loading settings from `designConfig.yaml`, so it should be easiest to change
styles there -- but if you need to alter or add something like a CSS class, take
a look at what's being defined in `index.hbs`.
