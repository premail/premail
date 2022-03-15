# Premail Changelog

## [Unreleased](https://github.com/premail/premail/tree/HEAD)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.5...HEAD)

### New features

- Reset defaults on all `<mj-wrapper>` elements in `index.hbs` [\#67](https://github.com/premail/premail/issues/67)
- Improve new-project scaffolding, example design theming, and file formatting [\#78](https://github.com/premail/premail/pull/78)
- Cleanup tasks, paths and watch [\#77](https://github.com/premail/premail/pull/77)
- Restrict Sass file loading to theme subdir of design [\#72](https://github.com/premail/premail/pull/72)

### Bug fixes

- Default design tweaks [\#65](https://github.com/premail/premail/issues/65)
- Accommodate old location of theme dir config [\#79](https://github.com/premail/premail/pull/79)
- Update mjml and custom components [\#69](https://github.com/premail/premail/pull/69)
- Update default design [\#68](https://github.com/premail/premail/pull/68)

### Other updates

- Update mjml to 4.12.0 [\#55](https://github.com/premail/premail/issues/55)
- Updating dependencies [\#75](https://github.com/premail/premail/pull/75)
- remove issue title prefixes [\#74](https://github.com/premail/premail/pull/74)
- Reduce npm package size; remove transitive dependency updates [\#73](https://github.com/premail/premail/pull/73)
- Project maintenance updates [\#71](https://github.com/premail/premail/pull/71)

## [v2.0.5](https://github.com/premail/premail/tree/v2.0.5) (2022-01-21)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.4...v2.0.5)

## [v2.0.4](https://github.com/premail/premail/tree/v2.0.4) (2022-01-17)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.3...v2.0.4)

**Closed issues:**

- Version published on NPM v2.0.0 is old [\#51](https://github.com/premail/premail/issues/51)

## [v2.0.3](https://github.com/premail/premail/tree/v2.0.3) (2022-01-15)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.2...v2.0.3)

## [v2.0.2](https://github.com/premail/premail/tree/v2.0.2) (2021-12-18)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.1...v2.0.2)

### New features

- Find a way to preprocess email content, then hand to templates [\#30](https://github.com/premail/premail/issues/30)

### Documentation

- Incorporate amazing-github-template [\#46](https://github.com/premail/premail/issues/46)

## [v2.0.1](https://github.com/premail/premail/tree/v2.0.1) (2021-12-17)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0...v2.0.1)

## [v2.0.0](https://github.com/premail/premail/tree/v2.0.0) (2021-12-17)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta14...v2.0.0)

### New features

- Create email workflow [\#39](https://github.com/premail/premail/issues/39)
- Launch v2.0.0 [\#52](https://github.com/premail/premail/pull/52)

### Documentation

- Move `docs` and `gh-pages` to another repo entirely [\#50](https://github.com/premail/premail/issues/50)
- Handle ever-expanding documentation [\#41](https://github.com/premail/premail/issues/41)

## [v2.0.0-beta14](https://github.com/premail/premail/tree/v2.0.0-beta14) (2021-11-04)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta13...v2.0.0-beta14)

### New features

- Transition to node module [\#44](https://github.com/premail/premail/issues/44)
- Add `mso-line-height-rule:exactly` anywhere line-height is set [\#43](https://github.com/premail/premail/issues/43)
- Incorporate custom components via new npm packages [\#42](https://github.com/premail/premail/issues/42)
- create custom component for list [\#9](https://github.com/premail/premail/issues/9)
- Move functionality into an npm module [\#48](https://github.com/premail/premail/pull/48)

### Bug fixes

- Get Codacy to respect eslintconfig [\#40](https://github.com/premail/premail/issues/40)

### Documentation

- Add and configure funding settings [\#47](https://github.com/premail/premail/issues/47)

## [v2.0.0-beta13](https://github.com/premail/premail/tree/v2.0.0-beta13) (2021-09-24)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta12...v2.0.0-beta13)

### New features

- Measure size of email and warn, per Gmail clipping issue [\#33](https://github.com/premail/premail/issues/33)
- Add an HTML entity encoder [\#25](https://github.com/premail/premail/issues/25)
- Validate config values [\#17](https://github.com/premail/premail/issues/17)

## [v2.0.0-beta12](https://github.com/premail/premail/tree/v2.0.0-beta12) (2021-09-10)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta11...v2.0.0-beta12)

### New features

- Consider creating `#eq` handlebars helper directly instead of relying on `handlebars-helpers` project [\#35](https://github.com/premail/premail/issues/35)
- Make sure non-ASCII characters are properly escaped [\#34](https://github.com/premail/premail/issues/34)
- Add a print stylesheet [\#28](https://github.com/premail/premail/issues/28)
- Move the janky-looking code in signoff.hbs into a custom component [\#2](https://github.com/premail/premail/issues/2)

### Bug fixes

- Correct fallback colors with ansi-colors-prioritized [\#26](https://github.com/premail/premail/issues/26)

## [v2.0.0-beta11](https://github.com/premail/premail/tree/v2.0.0-beta11) (2021-06-12)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta10...v2.0.0-beta11)

### New features

- Add user-configurable option for selectors to skip in plaintext version [\#32](https://github.com/premail/premail/issues/32)
- Replace .pipe with .pipeline [\#29](https://github.com/premail/premail/issues/29)
- Consider using Handlebars for all templates, inserting MJML as partials [\#27](https://github.com/premail/premail/issues/27)
- Reinstate Fibers [\#21](https://github.com/premail/premail/issues/21)
- run typogrify or something like it on rendered text [\#10](https://github.com/premail/premail/issues/10)
- Integrate Sass, with gulp workflow [\#1](https://github.com/premail/premail/issues/1)

### Bug fixes

- gulp's series\(\) doesn't seem to be waiting until each task is done [\#16](https://github.com/premail/premail/issues/16)

## [v2.0.0-beta10](https://github.com/premail/premail/tree/v2.0.0-beta10) (2021-05-25)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta9...v2.0.0-beta10)

## [v2.0.0-beta9](https://github.com/premail/premail/tree/v2.0.0-beta9) (2021-05-22)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta8...v2.0.0-beta9)

## [v2.0.0-beta8](https://github.com/premail/premail/tree/v2.0.0-beta8) (2021-05-11)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta7...v2.0.0-beta8)

### New features

- Splitting gulpfile [\#14](https://github.com/premail/premail/issues/14)
- add plaintext generation [\#11](https://github.com/premail/premail/issues/11)

## [v2.0.0-beta7](https://github.com/premail/premail/tree/v2.0.0-beta7) (2021-04-23)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta6...v2.0.0-beta7)

## [v2.0.0-beta6](https://github.com/premail/premail/tree/v2.0.0-beta6) (2021-04-21)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta5...v2.0.0-beta6)

## [v2.0.0-beta5](https://github.com/premail/premail/tree/v2.0.0-beta5) (2021-04-16)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta3...v2.0.0-beta5)

## [v2.0.0-beta3](https://github.com/premail/premail/tree/v2.0.0-beta3) (2021-04-08)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta2...v2.0.0-beta3)

## [v2.0.0-beta2](https://github.com/premail/premail/tree/v2.0.0-beta2) (2021-03-19)

[Full Changelog](https://github.com/premail/premail/compare/v2.0.0-beta1...v2.0.0-beta2)

## [v2.0.0-beta1](https://github.com/premail/premail/tree/v2.0.0-beta1) (2021-03-17)

[Full Changelog](https://github.com/premail/premail/compare/v1.0.1...v2.0.0-beta1)

## [v1.0.1](https://github.com/premail/premail/tree/v1.0.1) (2021-03-17)

[Full Changelog](https://github.com/premail/premail/compare/v1.0.0...v1.0.1)

### New features

- add true bold, italic webfonts [\#7](https://github.com/premail/premail/issues/7)
- add salutation section and move headline [\#5](https://github.com/premail/premail/issues/5)

### Bug fixes

- correct use of mj-text [\#8](https://github.com/premail/premail/issues/8)
- remove http://mjml.io in footer [\#6](https://github.com/premail/premail/issues/6)
- test background color [\#4](https://github.com/premail/premail/issues/4)
- Logo/nav sizing issues [\#3](https://github.com/premail/premail/issues/3)

## [v1.0.0](https://github.com/premail/premail/tree/v1.0.0) (2021-03-12)

[Full Changelog](https://github.com/premail/premail/compare/9da2a44e424b53e44604d7bc717abb6dd5e5eae3...v1.0.0)



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
