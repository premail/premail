{{#if theme.fonts.web}}
<!-- `mj-font` element needs to be outside `mj-attributes`
         @see: https://documentation.mjml.io/#mj-font
    -->

{{#if theme.fonts.stack.google.enabled}}
<mj-font
  name="{{theme.fonts.stack.google.name}}"
  href="{{{theme.fonts.stack.google.href}}}"
/>
{{/if}} {{#if theme.fonts.stack.custom.enabled}}
<mj-font
  name="{{theme.fonts.stack.custom.name}}"
  href="{{{theme.fonts.stack.custom.href}}}"
/>
{{/if}} {{/if}}

<!-- To change inlined CSS styles, edit `inline.scss` -->
<mj-style inline="inline">@@include('{{internal.css.inline}}')</mj-style>

<!-- To change pseudo CSS styles, edit `pseudo.scss` -->
<mj-style>@@include('{{internal.css.pseudo}}')</mj-style>

<!-- To change Gmail-specific CSS styles, edit `gmail.scss` -->
<mj-style>@@include('{{internal.css.gmail}}')</mj-style>

<mj-attributes>
  <!-- Applied to all elements -->

  <mj-all margin="0" padding="0" font-size="{{theme.text.default.size}}"
  color="{{theme.text.default.color}}" font-family=" {{~#eq
  theme.fonts.stack.base 'serif'}}{{internal.fonts.serif}}{{/eq}} {{~#eq
  theme.fonts.stack.base 'sans'}}{{internal.fonts.sans}}{{/eq}} {{~#eq
  theme.fonts.stack.base 'mono'}}{{internal.fonts.mono}}{{/eq}} " {{!--
  Background on these Outlook-specific tags:
  https://www.hteumeuleu.com/2019/today-i-learned-about-mso-generic-font-family/
  --}} mso-generic-font-family=" {{~#eq theme.fonts.stack.base
  'serif'}}roman{{/eq}} {{~#eq theme.fonts.stack.base 'sans'}}swiss{{/eq}}
  {{~#eq theme.fonts.stack.base 'mono'}}swiss{{/eq}} " mso-font-alt=" {{~#eq
  theme.fonts.stack.base 'serif'}}{{internal.fonts.serif}}{{/eq}} {{~#eq
  theme.fonts.stack.base 'sans'}}{{internal.fonts.sans}}{{/eq}} {{~#eq
  theme.fonts.stack.base 'mono'}}{{internal.fonts.mono}}{{/eq}} " />

  <!-- Structure -->

  <mj-class name="column" vertical-align="top" />

  <mj-class name="column--25pc" width="25%" />

  <mj-class name="column--33pc" width="33%" />

  <mj-class name="column--40pc" width="40%" />

  <mj-class name="column--50pc" width="50%" />

  <mj-class name="column--60pc" width="60%" />

  <mj-class name="column--67pc" width="67%" />

  <mj-class name="column--75pc" width="75%" />

  <mj-class name="component-salutation" background-color="white" />

  <mj-class name="component-signoff" background-color="white" />

  <mj-class name="component-footer" padding="48px 8px" />

  <!-- Typography -->

  <mj-class
    name="text"
    padding="18px 0"
    font-size="{{theme.text.default.size}}"
    line-height="{{theme.text.default.line-height}}"
  />

  <mj-class name="text--salutation" padding="18px 0 0" />

  <mj-class name="text--signoff" line-height="24px" />

  <mj-class
    name="text--footer"
    padding="12px 0"
    font-size="11px"
    line-height="11px"
  />

  <!-- Buttons -->

  <mj-class
    name="button"
    padding="0 18px 18px"
    background-color="{{theme.colors.primary}}"
    color="white"
    font-weight="bold"
    border-radius="8px"
  />

  <mj-class
    name="button--ghost"
    background-color="white"
    color="{{theme.colors.primary}}"
    border="{{theme.colors.primary}} 2px solid"
  />

  <!-- Images -->

  <mj-class name="image" padding="18px 0" />

  <mj-class name="image--50pc" padding="18px 32px" />

  <!-- Hero (banner) -->

  <mj-class
    name="hero"
    mode="fixed-height"
    background-color="grey"
    vertical-align="middle"
  />

  <mj-class
    name="hero__title"
    align="center"
    font-size="48px"
    font-weight="bold"
    color="white"
  />

  <mj-class
    name="hero-border"
    container-background-color="white"
    border-color="{{theme.colors.primary}}"
    border-width="2px"
  />

  <!-- Social media links -->

  <mj-class
    name="component-social"
    padding="32px 0 16px"
    background-color="white"
  />

  <mj-class
    name="social__border-top"
    padding-bottom="16px"
    border-width="1px"
    border-style="dashed"
    border-color="{{theme.colors.primary}}"
  />

  <mj-class
    name="social__nav"
    mode="horizontal"
    icon-size="48px"
    font-size="16px"
  />

  <mj-class
    name="social__icon"
    padding="16px"
    background-color="{{theme.colors.primary}}"
    border-radius="6px"
  />

  <!-- Navigation menus -->

  <mj-class
    name="nav"
    padding="16px"
    background-color="{{theme.colors.primary}}"
    color="white"
  />

  <mj-class name="nav--top" />

  <mj-class name="nav--bottom" />

  <mj-class name="nav__logo" padding="16px" width="75px" height="24px" />

  <!-- Note using the hamburger menu icon will necessitate
  another font download for the icon, per MJML. -->
  <mj-class name="nav__navbar" hamburger="hamburger" ico-color="white" />

  <mj-class name="nav__navbar--top" padding="16px 0" />

  <mj-class name="nav__navbar--bottom" padding="4px 0" />

  <mj-class
    name="nav__link"
    padding="0 16px"
    font-size="16px"
    font-weight="bold"
    color="white"
  />
</mj-attributes>
