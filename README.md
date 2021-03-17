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

# Zoho settings for a standard newsletter

* The merge tag for the first name is `$[FNAME|Multi-Etch User|Multi-Etch User]$`
* Campaign title should be in the form `2021-01-31 Newsletter`
* Copy subject from `title.mjml`.
* Copy preheader from `preview.mjml`.
* Sender (same for all) is `Chris, Multi-Etch Answer Man`
* From address is `info@`
* Click "Show reply-to address details" and choose "Reply Tracking"
* Recipients is the newsletter list
* Choose "HTML Editor" (bottom row) for entering the content
* Choose the image icon in the toolbar and upload all necessary images. For each
image, uncheck "Wrap text around image" and leave all other settings at default.
The images will appear in the area below; leave them there and we'll take care
of them in the next step.
* Choose the `</>` icon in the toolbar. Under some standard HTML you'll see the
code for the images you inserted. Copy these into a temporary file, then extract
the actual URLs for the images and insert them into the MJML files. Rebuild the
`index.html` file. (Whew!)
* Now copy the generated `index.html` into the code window you've already
opened, replacing everything that's there.
* At the top, click "Save Changes" and then "Preview and Test".
* Above the content display, click "Add Preheader". Copy the text from
`preview.mjml` and paste it here. (Why Zoho makes us do this twice we do not
know).
* If the content-editing screen doesn't close automatically, click "Save and
Next".
* To the right of the content preview, click "Edit plain text".
* Zoho will have auto-generated a plain-text version of the newsletter. You'll
want to clean this up, probably in a separate text editor window, and then paste
it back. Don't worry about preheader text in the plain-text version; just start
with "Dear...". (Remember Zoho merge tags like first name _do_ work in the
plain-text versions, so leave those in place.)
* Also to the right of the content preview, make sure the "Header Footer Theme"
is set to "None (No Header and Footer)". If it's not, click "change theme" to
set it correctly. We include the header and footer ourselves.
* If you want to set up custom scoring for customers who click links, at the
bottom of the screen, click "Show advanced options" and then create
campaign-specific scoring rules.
* Again to the right of the content preview, click "Send test email" and send
yourself both HTML and plain text versions. You can send any number of these,
for instance if you want to preview in different email accounts on different
devices.
* Finally, at the top of the screen you will probably need to send the campaign
to Zoho to review -- this usually only takes a few moments. Take a break.
* Once approved, schedule the campaign for "recipients' optimal open time."

# Licenses

Underlying code from
[rootwork/mjml-quickstart](https://github.com/rootwork/mjml-quickstart) is
[GPLv3](LICENSE-code).

Content of emails, including text, logos, and images, are
[copyrighted](LICENSE-content) by [Multi-Etch, LLC](https://www.multietch.com)
or their respective copyright-holders as noted in the newsletters.

"Multi-Etch" is a registered trademark of Exotica Jewelry, Inc.
