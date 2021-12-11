# Email: Example

This directory contains the files for an example email.

Settings for this email are defined in `emailConfig.yaml`.

Because this example email does not define a design in these settings, it uses
the default design. Because `premail.yaml` defines the default design as
`_default`, this email is being built with that design, located in
`designs/_default`.

Designs can also be defined on the command line using the `-d` flag, in which
case they override any file-based settings.

## Content and structure

Premail separates email into common components, and further groups them by
whether they are likely to change from email to email within the same design.

**Any file in an `email` will override the identical file in a `design`.**

In the `content` subdirectory of this email, you'll find the components that are
likely to change with each email:

- `title.hbs` is the HTML `<title>` of the email; some email clients will use it
  as a subject line.
- `preview.hbs` contains the preview or preheader text, which is shown in some
  email clients in truncated form just below the subject line.
- `banner.hbs` [optional] is a full-width image, sometimes known as a hero
  image, that appears just after the top navigation in an email. Full-width
  images can also be used within the body, of course.
- `salutation.hbs` [optional] is the opening of the email, such as "Dear
  friend,"
- `body.hbs` is the main content of the email, in which you can use any
  [MJML body components](https://documentation.mjml.io/#standard-body-components)
  other than `<mj-wrapper>`, as it already wraps the body content. In most cases
  you'll need to use [`<mj-section>`](https://documentation.mjml.io/#mj-section)
  and [`<mj-column>`](https://documentation.mjml.io/#mj-column) components
  around individual content items, as demonstrated in the example file.
- `signoff.hbs` is the closing text of your email that could include a name,
  title, portrait image and other information.

In the `structure` subdirectory of this email, you'll find only those components
for which you want to _override_ the same component in the design itself. As an
example, `footer.hbs` is included, which overrides the footer from any design
used to build this email. To use the design's footer instead, delete
`structure/footer.hbs` from this email.

In the `dist` subdirectory of this email is the rendered email, in HTML and
(optionally) plain-text formats.
