  <!-- `mj-font` element needs to be outside `mj-attributes`
       @see: https://documentation.mjml.io/#mj-font
  -->
  <mj-font
      name="Source Sans Pro"
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,900;1,400;1,900&amp;display=swap"

  />

<mj-style inline="inline">h1{margin:0;padding:18px 0;font-size:36px;line-height:32px;font-weight:bold}h2{margin:0;padding:18px 0;font-size:28px;line-height:32px;font-weight:bold}.mj-column-per-50 h2{padding:18px;align:center;vertical-align:middle}p{margin:0 0 18px}.salutation p{margin:0}a{font-weight:bold;text-decoration:underline}</mj-style>

<!-- WARNING: The following section is for CSS styles that cannot
be inlined, like link-hover effects. Remember that only
a small subset of recipients will see these, so use this
section for enhancement only; things should be readable even
when these styles don't load! You'll need to add !important
to all these styles to override the inlined ones, so be sure
to test (e.g. if you change a link's color on hover, make
sure it still works in the context of buttons, navigation menus,
the footer, headings/subheadings, social icons, etc.). -->
<mj-style>
  a:hover, a:focus, a:active { } .button a:hover, .button a:focus, .button
  a:active { } .button--ghost table a:hover, .button--ghost table a:focus,
  .button--ghost table a:active { } .nav a:hover, .nav a:focus, .nav a:active {
  } .social a:focus { }
</mj-style>

<mj-attributes>
  <!-- Applied to all elements -->

  <mj-all
    margin="0"
    padding="0"
    font-family="Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol
    "
    font-size="18px"
    color="#666"
  />

  <!-- Structure -->

  <mj-class name="content" padding="0 8px" background-color="white" />

  <mj-class name="column" vertical-align="top" />

  <mj-class name="column--25pc" width="25%" />

  <mj-class name="column--33pc" width="33%" />

  <mj-class name="column--40pc" width="40%" />

  <mj-class name="column--50pc" width="50%" />

  <mj-class name="column--60pc" width="60%" />

  <mj-class name="column--67pc" width="67%" />

  <mj-class name="column--75pc" width="75%" />

  <mj-class name="salutation" background-color="white" padding="0 8px" />

  <mj-class name="signoff" background-color="white" padding="0 8px" />

  <mj-class name="footer" padding="48px 8px" background-color="white" />

  <!-- Typography -->

  <mj-class name="text" padding="18px 0" font-size="18px" line-height="32px" />

  <mj-class name="text--salutation" />

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
    background-color="purple"
    color="white"
    font-weight="bold"
    border-radius="8px"
  />

  <mj-class
    name="button--ghost"
    background-color="white"
    color="purple"
    border="purple 2px solid"
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
    border-color="purple"
    border-width="2px"
  />

  <!-- Social media links -->

  <mj-class name="social" padding="32px 0 16px" background-color="white" />

  <mj-class
    name="social__border-top"
    padding-bottom="16px"
    border-width="1px"
    border-style="dashed"
    border-color="purple"
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
    background-color="purple"
    border-radius="6px"
  />

  <!-- Navigation menus -->

  <mj-class name="nav" padding="16px" background-color="purple" color="white" />

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
