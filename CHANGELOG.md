# Premail Changelog

## [v2.0.5](https://github.com/premail/premail/tree/v2.0.5) (2022-01-20)

The only real change in this release is fixing a missing `gulpfile.js` in the
npm package, and a little cleanup to those gulp tasks. All the other commits
were internal to GitHub (mostly project management stuff and some Actions).

## [v2.0.4](https://github.com/premail/premail/tree/v2.0.4) (2022-01-16)

Fixes [#53](https://github.com/premail/premail/issues/53) and makes
Windows-based installs more reliable.

Other changes:

- added Node CI to make sure any changes don't break the basic functions of the
  program!
- updated documentation
- bumped dependencies yargs, sass, gulp-sass, prettier, pretty-error,
  eslint-plugin-\*

## [v2.0.3](https://github.com/premail/premail/tree/v2.0.3) (2022-01-14)

The last release did not fix the critical error in
[#51](https://github.com/premail/premail/issues/51) after all. I'm hoping this
one will.

Other changes:

- `premail` on its own no longer runs `premail build`. Although that was nice to
  have as a default, it made interpreting commands (and especially recovering
  from failing commands) difficult. This may be added back in the future or
  aliased to something like displaying the help.
- We now check for the presence of `premail.yaml` when running `build`, and
  return an error message if it's not present. (In other words, if you haven't
  run `premail init` yet.)
- The language attribute on the email has been disabled for now until
  [#20](https://github.com/premail/premail/issues/20) can be unblocked. It does
  look like MJML may have recently made a commit that will address this, so
  hopefully it will return soon.
- Upgraded some dependencies to address security issues in sub-dependencies.

## [v2.0.2](https://github.com/premail/premail/tree/v2.0.2) (2021-12-17)

Patch update to fix a critical path issue (Fixes
[#51](https://github.com/premail/premail/issues/51),
[6a9e810](https://github.com/premail/premail/commit/6a9e8109b514998c7a25b0b4c4eb5f7454e3096b))
and a minor readme fix for NPM
([e07fe0d](https://github.com/premail/premail/commit/e07fe0da93472300e3efc62837e381bd25f16bcc)).

## [v2.0.1](https://github.com/premail/premail/tree/v2.0.1) (2021-12-16)

This is identical to the v2.0.0 release on GitHub, but previously a beta was
mistakenly pushed to NPM, so v2.0.1 now aligns GitHub and NPM with the same
code.

## [v2.0.0](https://github.com/premail/premail/tree/v2.0.0) (2021-12-06)

Finally, a v2 release! Compared to where this started, Premail is a completely
new tool with a new name, so this is really more like a v1.

And, transparently, there are still some known bugs. I'm going to try to create
issues for these in the coming days, but I wanted to get a v2 release out the
door so that the NPM package could be properly updated.

Full list of commits since the last beta:

### Changes

- License change: GPL3+ to AGPL3+
- Adapting `premail build` so that the design and email components can be stored
  and configured separately. [#39](https://github.com/premail/premail/issues/39)
- Improving `premail init` and `premail destroy` commands.
- Updating the MJML custom components' versions.
- Some internal code restructuring, such as consistently naming design-related
  functions, variables, settings, etc. "design" instead of sometimes "theme".
- Removing unused dependencies.
- Documentation updates, including the launching of a dedicated documentation
  site, https://premail.dev [#50](https://github.com/premail/premail/issues/50)
- Listing sponsors and adding funding
  [#47](https://github.com/premail/premail/issues/47)
- Project management stuff: adding a contribution guide and code of conduct,
  improving issue/PR labels, and adding some automated code and language checks.

### Known issues

- Some email clients may not include a `lang` attribute.
  [#20](https://github.com/premail/premail/issues/20)

## [v2.0.0-beta14](https://github.com/premail/premail/tree/v2.0.0-beta14) (2021-11-03)

<img src="https://raw.githubusercontent.com/premail/premail/v2.0.0/docs/images/logo.svg" alt="Premail" width="500" height="250">

MJML Quickstart is now **Premail**, and is now a fully-fledged
[Node module](https://www.npmjs.com/package/premail) that you can run in the
command-line using `premail`.
[#44](https://github.com/premail/premail/issues/44)

### Changes

- New commands: `premail init`, `premail destroy`, `premail build`,
  `premail watch`, `premail format`, `premail clean`.
- The custom components
  [announced in the last release](https://github.com/premail/premail/releases/tag/v2.0.0-beta13)
  are now in separate projects and being used like any other Node modules:
  [mjml-bullet-list](https://www.npmjs.com/package/mjml-bullet-list) and
  [mjml-signoff](https://www.npmjs.com/package/mjml-signoff).
- Line-height properties should now work more consistently in the Outlooks.
  [#43](https://github.com/premail/premail/issues/43)
- Some project structure changes, making a clear separation between internal
  functions and user-facing templates.
- A refreshed
  [logo](https://raw.githubusercontent.com/premail/premail/v2.0.0/docs/images/logo.svg).
- Documentation was completely overhauled and updated.
  [#46](https://github.com/premail/premail/issues/46)
  [#47](https://github.com/premail/premail/issues/47)
- Codacy is scanning correctly now.
  [#40](https://github.com/premail/premail/issues/40)
- Dependency versions were bumped up, including npm to v7.

### Known issues

- Email-specific workflow. [#39](https://github.com/premail/premail/issues/39)
- Some email clients may not include a `lang` attribute.
  [#20](https://github.com/premail/premail/issues/20)
- The project readme needs to be more manageable, with sections going in
  dedicated files under `docs`.
  [#41](https://github.com/premail/premail/issues/41)

## [v2.0.0-beta13](https://github.com/premail/premail/tree/v2.0.0-beta13) (2021-09-28)

This release is focused on finalizing the two custom components,
[`<mj-list>`](https://github.com/rootwork/mjml-quickstart/tree/v2.0.0#mj-list-and-mj-li)
and
[`<mj-signoff>`](https://github.com/rootwork/mjml-quickstart/tree/v2.0.0#mj-signoff),
and expanding theming options.

### Changes

- [`<mj-list>`](https://github.com/rootwork/mjml-quickstart/tree/v2.0.0#mj-list-and-mj-li)
  (and its companion `<mj-li>`) allows for the easy creation of accessible,
  bulletproof list items, because otherwise you have to do
  [a fair amount of hand-styling](https://www.litmus.com/blog/the-ultimate-guide-to-bulleted-lists-in-html-email/).
  [#9](https://github.com/premail/premail/issues/9)
- [`<mj-signoff>`](https://github.com/rootwork/mjml-quickstart/tree/v2.0.0#mj-signoff)
  has been updated to be simpler and easier to use, with a minimum of
  user-facing code.
- Many more theming options can be set within
  [`themeConfig.yaml`](https://github.com/rootwork/mjml-quickstart/blob/v2.0.0/designs/_templates/theme/themeConfig.yaml)
  rather than wading into Sass and MJML files.
- Config options are now run through simple validation to ensure nothing is
  easily broken. [#17](https://github.com/premail/premail/issues/17)
- The `watch` task had been broken; it's now fixed.
- The old `gulp-mjml` and `gulp-prettier` packages weren't really necessary in
  the Gulp 4 `pipeline()` syntax, so they were removed.
- Documentation in the
  [README](https://github.com/rootwork/mjml-quickstart/blob/v2.0.0/README.md)
  was updated to match new features, in particular giving easier-to-read tables
  of options for the custom components. This file is getting pretty long, so
  it's likely this will be split out into separate files, a wiki, or a
  documentation repo.
- Dependency versions were bumped up.

### Known issues

- Email-specific workflow. [#39](https://github.com/premail/premail/issues/39)
- Some email clients may not include a `lang` attribute.
  [#20](https://github.com/premail/premail/issues/20)
- Codacy is scanning commits now through a GitHub action, but it's reporting a
  lot of false failures because it doesn't seem to be reading the
  `.eslintconfig` file. Will need to investigate, but this is low-priority.
  [#40](https://github.com/premail/premail/issues/40)

## [v2.0.0-beta12](https://github.com/premail/premail/tree/v2.0.0-beta12) (2021-09-09)

Reducing the remaining issues, one by one!

### Changes

- Our first MJML custom component: We provide `<mj-signoff>`, which floats an
  image next to a signature/name (and most significantly, does not try to
  full-screen the tiny image on mobile, as MJML images normally would).
  [#2](https://github.com/premail/premail/issues/2)
- We now measure the file size of the rendered email and warn you if it escapes
  Gmail's (likely) clipping limit.
  [#33](https://github.com/premail/premail/issues/33)
- Emojis and other non-ASCII characters are confirmed to be properly escaped.
  [#34](https://github.com/premail/premail/issues/34)
- Templates can now be passed as either partials (e.g. `{{partials.body}}`) or
  as data (e.g. `{{> body.hbs}}`). This allows us to check whether a partial
  exists and then render container markup only if it does.
- The intermediate template (post-Handlebars, pre-MJML) can now be more easily
  rendered, if desired, with the `--temp` flag.
- We now have a print stylesheet! It sets sane defaults and makes it easier to
  override as necessary. [#28](https://github.com/premail/premail/issues/28)
- We now check for MJML singleton elements (like `<mjml-image />`) and suggest
  using a closing tag (like `<mjml-image></mjml-image>') due to issues with some
  HTML parsers.
- Typographic CSS is now properly inlined, and a regression in typeset
  formatting was fixed.
- ANSI colors now have proper fallbacks.
  [#26](https://github.com/premail/premail/issues/26)
- The `handlebars-helper` package was dropped in favor of a leaner single-use
  `eq` helper. [#35](https://github.com/premail/premail/issues/35)
- Various dependency versions were bumped, most notably gulp-sass to
  [5.0.0](https://github.com/dlmanning/gulp-sass/releases/tag/v5.0.0). This
  means we also drop support for Node 10.

### Known issues

- Email-specific workflow.
- Some email clients may not include a `lang` attribute.
  [#20](https://github.com/premail/premail/issues/20)

## [v2.0.0-beta11](https://github.com/premail/premail/tree/v2.0.0-beta11) (2021-06-11)

I keep thinking I'm about to be able to do the email workflow piece and then
other things come up. So there's more to be done, but this seems like an
important place to mark a release.

### Changes

- All templates are now Handlebars templates rather than MJML. This allows for
  cleaner content and configuration insertion where necessary, cleanly separates
  content processing from HTML processing, and avoids some of the
  [restrictions](https://github.com/mjmlio/mjml/issues/2270) of MJML nesting.
  [#27](https://github.com/premail/premail/issues/27),
  [#30](https://github.com/premail/premail/issues/30)
- Refactored the Gulp processes using `pipeline()` rather than `.pipe()`, which
  is [the new standard](https://github.com/gulpjs/gulp/discussions/2586).
  [#29](https://github.com/premail/premail/issues/29)
- Added typographical enhancements with Detergent and Typeset.
  [#10](https://github.com/premail/premail/issues/10)
- Added even better HTML minification on production build with
  [html-crush](https://codsen.com/os/html-crush)
- Reinstated Fibers for faster Sass processing.
  [#21](https://github.com/premail/premail/issues/21)
- Potentially faster command-line argument handling by switching from minimist
  to [mri](https://www.npmjs.com/package/mri). Also removed some custom code
  cruft around this.
- Enabled more user-configurable options.
- Internal notification coding is quite a bit DRYer.
- Error handling is a little bit DRYer.
- Prettier now wraps Markdown files automatically.

### Known issues

- The email-specific workflow is still undone. This is the only remaining task
  before a release.

## [v2.0.0-beta10](https://github.com/premail/premail/tree/v2.0.0-beta10) (2021-05-25)

- Fixed [#16](https://github.com/premail/premail/issues/16)
- To that end: Processing of styles and templates is done in-memory, and
  temporary files are no longer written to disk.
- Templates are now back to sane file extension defaults: The main file is
  `index.hbs` as it is mostly (and most importantly) a Handlebars file, whereas
  all of the MJML partials are properly `.mjml` once again. This does restrict
  us a bit in only using Handlebars-related things (values, includes) in the
  main file, but the alternatives were all unsatisfactory.
- `attributes.tpl`, which was in the themes folder, has been absorbed into
  `index.hbs` so that there is just one file upon which Handlebars processing
  needs to occur.
- The `watch` task was updated to align with the new build process.
- Fixed [#1](https://github.com/premail/premail/issues/1) (although there is
  always more to do in terms of componentizing the design and exposing options
  to the user)
- Documentation updated.
- Removed a couple of dependencies that are no longer necessary.

### Known issues

- The email-specific workflow is still undone. This is the only remaining task
  before a release.

## [v2.0.0-beta9](https://github.com/premail/premail/tree/v2.0.0-beta9) (2021-05-21)

- Variables in each theme's YAML configuration file are carried through to Sass
  files to define things like sizes and colors.
- The watch task is now working, with the caveat of the build errors (see
  below).
- New theming features were added.
- Properly included defined web fonts in CSS font stacks.
- Removed unnecessary font download for MJML mobile-friendly navigation icons.
- Internal config and path functions and variables were streamlined.
- Made sure packages and auto-generated files aren't being linted.
- Moved from chalk to ansi-colors to cut down on dependencies and increase CLI
  speed.
- Added notes to documentation to clarify that because of gulp/chokidar
  limitations/breaking changes, this can only be used with Node 12.x (or
  probably 10.x). Recreated package.json requirements based on that version of
  Node/npm.

### Known issues

- [#16](https://github.com/premail/premail/issues/16): Gulp tasks in the build
  series are not waiting for completion. This is a release blocker.
- The email-specific workflow is still undone. Also a release blocker.

## [v2.0.0-beta8](https://github.com/premail/premail/tree/v2.0.0-beta8) (2021-05-10)

- Templates are now built in two stages: From Handlebars to MJML, and from MJML
  to HTML
- MJML templates were refactored to pass validation: strict.
- Sass is rendered into CSS, which is now injected into the resulting HTML.
- Designs now have theme configuration files.
- Google Fonts URIs, if used, are constructed from options in configuration
  automatically.
- Internal streamlining of config and path values.
- Improvement of error handling and notifications, and debug options.
- Adoption of standardJS, modern-node, and Prettier to automate code checks and
  formatting.
- Added internal npm task to update the Readme when gulp tasks change.
- MJML bumped to latest version.
- Updated documentation.
- Regenerated example.

### Known issues

- [#16](https://github.com/premail/premail/issues/16): Gulp tasks in the build
  series are not waiting for completion. This is a release blocker.
- The email-specific workflow is still undone. Also a release blocker.

## [v2.0.0-beta7](https://github.com/premail/premail/tree/v2.0.0-beta7) (2021-04-22)

- Added a plain-text version generation, with several options defined in
  `config.yaml`.
- buildTemplates and watchTemplates tasks were renamed buildHTML and watchHTML,
  since we will likely need separate tasks to process Handlebars templating.
- Simplified internal path generation and related variables.
- Aligned config variables, internal variables, template filenames, and CSS
  classes for component templates.
- Some bugfixes and regression fixes in the templates.
- Updated documentation.

### Known issues

- Sass is rendered into CSS, but isn't yet injected into the resulting HTML.
- The email-specific workflow is still undone.

## [v2.0.0-beta6](https://github.com/premail/premail/tree/v2.0.0-beta6) (2021-04-21)

- Split up the tasks and functions in `gulpfile.js` to component files, now
  located in `__lib`.
- Normalized task names to function names.
- Added a dedicated clean task.
- Added a `--debug` option to tasks.
- Fixed regression in the listTemplates task.
- Improved log messages.
- Updated documentation.

### Known issues

- Sass is rendered into CSS, but isn't yet injected into the resulting HTML.
- The email-specific workflow is still undone.

## [v2.0.0-beta5](https://github.com/premail/premail/tree/v2.0.0-beta5) (2021-04-16)

(**v2.0.0-beta4** was removed because it was accidentally pinned to the main
branch)

Moved templates from `.mjml` to `.tpl` since these will be run through
Handlebars processing, MJML processing _and_ injected with Sass/CSS references.
But also set this extension as a variable, so it's easy to change if need be.

Created a basic Sass rendering.

Stubbed out Handlebars rendering.

Improved notifications and error handling.

Updated readme to match new workflow.

### Known issues

Sass is rendered into CSS, but isn't yet injected into the resulting HTML.

The email-specific workflow is still undone.

## [v2.0.0-beta3](https://github.com/premail/premail/tree/v2.0.0-beta3) (2021-04-07)

Moved to `designs` and `emails` directory structure so that the two usages can
be kept distinct, and build processes can mix and match each.

Created CLI arguments process, with gulp tasks to render based on `-d` (design),
`-e` (email) and `--prod` (Boolean value for production rendering). The workflow
now operates on specific directories, not every subdirectory -- hooray!

Reverted `_lib` and separate JS module files for now, until things are more
finalized.

Removed specializations for Sublime Text 3 since, with the improved gulp
workflow, they're pretty minimal and not worth including in this project.

Bumped NPM version and added a requirements section since we specifically need
Node 10+.

Updated readme to match new workflow.

### Known issues

The entire system for rendering particular emails with particular designs hasn't
yet been built; right now the system just rebuilds the individual designs based
on user input (or defaults to `_templates`).

No Sass building/rendering yet.

## [v2.0.0-beta2](https://github.com/premail/premail/tree/v2.0.0-beta2) (2021-03-18)

Altered gulpfile into modern ES6 format with the help of `esm` for importing,
and split the file into individual module files.

This also introduces the `_lib` directory which will hold all of this project's
internals, so that at the top level there will just be `_lib` and `_templates`,
and then all of email-design and email-copy directories.

## [v2.0.0-beta1](https://github.com/premail/premail/tree/v2.0.0-beta1) (2021-03-17)

- mjml-quickstart now uses Node and Gulp for its workflow, instead of bash
  scripts and `mjml-cli`
- output now goes in the `dist` subdirectory of each design/email directory
- comments are now properly stripped from the minified versions
- [`prettier`](https://prettier.io/) is now included as an optional task you can
  use to clean up your MJML files

## [v1.0.1](https://github.com/premail/premail/tree/v1.0.1) (2021-03-16)

Various bug fixes and refinements.

## [v1.0.0](https://github.com/premail/premail/tree/v1.0.0) (2021-03-12)

First fully-functional release.
