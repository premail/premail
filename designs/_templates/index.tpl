<mjml lang="en">
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

  <mj-body>
    <!-- Top navigation -->

    <mj-section css-class="nav nav--top component-topNav">
      <mj-include path="structure/topNav.tpl" />
    </mj-section>

    <!-- Hero or header area -->

    <mj-section css-class="component-banner banner">
      <mj-include path="content/banner.tpl" />
    </mj-section>

    <!-- Salutation, aka "Dear friend," -->

    <mj-section css-class="component-salutation">
      <mj-include path="content/salutation.tpl" />
    </mj-section>

    <!-- Primary content -->

    <mj-section css-class="component-body message-body">
      <mj-include path="content/body.tpl" />
    </mj-section>

    <!-- Sign-off, signature or closing -->

    <mj-section css-class="component-signoff">
      <mj-include path="content/signoff.tpl" />
    </mj-section>

    <!-- Social links -->

    <mj-section css-class="component-social">
      <mj-include path="structure/social.tpl" />
    </mj-section>

    <!-- Bottom navigation -->

    <mj-section css-class="nav nav--bottom component-bottomNav">
      <mj-include path="structure/bottomNav.tpl" />
    </mj-section>

    <!-- Footer -->

    <mj-section css-class="component-footer footer">
      <mj-include path="structure/footer.tpl" />
    </mj-section>

    <!-- Body closure -->
  </mj-body>

  <!-- Root closure -->
</mjml>
