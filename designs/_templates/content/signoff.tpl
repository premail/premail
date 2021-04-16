<mj-wrapper mj-class="signoff">
  <mj-section>
    <mj-column mj-class="column signoff__column">
      <!-- We use a regular image tag here because we don't actually want this
      to act like a normal column and stack at full-width in mobile. The
      portrait should always be the same width and to the left of the text. Note
      that the float style won't work in some clients, but the fall-back
      (subsequent lines after the <br /> wrapping under the image) is
      acceptable. -->
      <mj-text mj-class="text text--signoff">
        <img
          src="https://picsum.photos/75/100"
          width="75"
          height="100"
          alt=""
          style="
            border: 0;
            outline: none;
            text-decoration: none;
            padding-right: 18px;
            float: left;
          "
        />
        Thank You,<br /><br />
        John Q. Public<br />
        Wild and Crazy Guy
      </mj-text>
    </mj-column>
  </mj-section>
</mj-wrapper>
