Periodic newsletters sent out from those who sign up at
[MultiEtch.com](https://www.multietch.com).

![Multi-Etch logo](/_templates/images/multietch.png)

Written in MJML and processed into ugly email code for importing into senders.

See [the usage file](USAGE.md) for instructions on using.

# Style guide

* Logo is above.
* Brand purple is `#46175b`.
* Font stack uses [Google Fonts' Hind](https://fonts.google.com/specimen/Hind)
followed by system fonts with emoji support,
[copied from GitHub](https://markdotto.com/2018/02/07/github-system-fonts/#the-stack):
`Hind, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
* In-text links should always be underlined. Exceptions are only for obvious
menu items (i.e. not "in-text") or linked images/graphics.
* Link-hover/active/focus states should only be used for enhancement, as not all
email clients will see them.
* Prominent links should appear as buttons, set off by themselves, rather than
(only) links within paragraphs.
* All non-decorative images should have alt text.
* Images should be sized at twice their HTML-displayed width, for
high-res/retina display.
* Images should be pleasing at full-width. They can be displayed in columns at
desktop widths, but will still be full-width at smaller screen sizes.
* If image floats are used, it should be made clear that only some email
recipients will see them, and the text/image layout should be readable even if
the image float is disabled.
* Buttons should be of the form:
`<mj-button mj-class="button" css-class="button" href="#" title="TITLE">TEXT</mj-button>`
or:
`<mj-button mj-class="button button--ghost" css-class="button button--ghost" href="#" title="TITLE">TEXT</mj-button>`
The CSS classes are necessary for styling of the link elements.

# Licenses

Underlying code from
[rootwork/mjml-quickstart](https://github.com/rootwork/mjml-quickstart) is
[GPLv3](LICENSE-code).

Content of emails, including text, logos, and images, are
[copyrighted](LICENSE-content) by [Multi-Etch, LLC](https://www.multietch.com)
or their respective copyright-holders as noted in the newsletters.
