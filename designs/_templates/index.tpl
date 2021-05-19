<mjml lang="{{user.language.default}}">
  <!-- Head declaration -->

  <mj-head>
    <!-- Title -->
    <mj-include path="content/title.tpl" />

    <!-- Attributes -->
    <mj-include path="theme/attributes.tpl" />

    <!-- Preview text -->
    <mj-include path="content/preview.tpl" />
  </mj-head>

  <!-- Email body start -->

  <mj-body css-class="body" background-color="white">
    <!-- Top navigation -->

    <mj-wrapper
      css-class="component-topNav nav nav--top"
      mj-class="component-topNav nav nav--top"
    >
      <mj-include path="structure/topNav.tpl" />
    </mj-wrapper>

    <!-- Hero or header area -->

    <mj-wrapper css-class="component-banner" mj-class="component-banner">
      <mj-include path="content/banner.tpl" />
    </mj-wrapper>

    <!-- Salutation, aka "Dear friend," -->

    <mj-wrapper
      css-class="component-salutation"
      mj-class="component-salutation"
    >
      <mj-include path="content/salutation.tpl" />
    </mj-wrapper>

    <!-- Primary content -->

    <mj-wrapper css-class="component-body" mj-class="component-body">
      <mj-include path="content/body.tpl" />
    </mj-wrapper>

    <!-- Sign-off, signature or closing -->

    <mj-wrapper css-class="component-signoff" mj-class="component-signoff">
      <mj-include path="content/signoff.tpl" />
    </mj-wrapper>

    <!-- Social links -->

    <mj-wrapper css-class="component-social" mj-class="component-social">
      <mj-include path="structure/social.tpl" />
    </mj-wrapper>

    <!-- Bottom navigation -->

    <mj-wrapper
      css-class="component-bottomNav nav nav--bottom"
      mj-class="component-bottomNav nav nav--bottom"
    >
      <mj-include path="structure/bottomNav.tpl" />
    </mj-wrapper>

    <!-- Footer -->

    <mj-wrapper css-class="component-footer" mj-class="component-footer">
      <mj-include path="structure/footer.tpl" />
    </mj-wrapper>

    <!-- Body closure -->
  </mj-body>

  <!-- Root closure -->
</mjml>
