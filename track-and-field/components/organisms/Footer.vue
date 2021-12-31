<template>
  <v-footer dark>
    <div>
      <img
        width="80"
        height="50"
        src="~static/images/logo/logo-square.svg"
        alt="shoespicks"
      />
    </div>
    <div>
      <ul class="footer-bottom-links">
        <li><a href="https://einja.net">運営会社 Einja</a></li>
      </ul>
    </div>
    <small
      >©{{ new Date().getFullYear() }} ︎Einja, Inc. All Rights Received</small
    >
  </v-footer>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {},
  setup() {
    return {};
  }
});
</script>
<style lang="scss">
footer.v-footer {
  padding: 32px 32px 16px;
  flex-direction: column;
  color: #ffffff;

  > * {
    text-align: center;

    + * {
      margin-top: 24px;
    }

    + small {
      margin-top: 8px;
    }
  }

  > section {
    > * + * {
      margin-top: 8px;
    }
  }

  .footer-bottom-links {
    display: flex;
    > li {
      > a {
        font-size: 14px;
        color: #ffffff;

        &:hover {
          text-decoration: underline;
        }
      }

      + li {
        margin-left: 16px;
      }
    }
  }

  h4 {
    font-weight: 400;
    font-size: 14px;
  }
}
</style>
