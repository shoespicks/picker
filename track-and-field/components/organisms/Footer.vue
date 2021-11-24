<template>
  <v-footer dark>
    <section>
      <h4>SNSをフォローして最新情報をチェック</h4>
      <ul class="footer-sns-links">
        <li v-for="(icon, index) in snsLinkIcons" :key="index">
          <Button color="white" icon>
            <v-icon size="28">{{ icon }}</v-icon>
          </Button>
        </li>
      </ul>
    </section>
    <div>
      <img
        width="80"
        height="80"
        src="~static/images/logo/logo-square.svg"
        alt="shoespicks"
      />
    </div>
    <div>
      <ul class="footer-bottom-links">
        <li><a href="">運営会社</a></li>
        <li><a href="">プライバシーポリシー</a></li>
        <li><a href="">利用規約</a></li>
      </ul>
    </div>
    <small
      >©{{ new Date().getFullYear() }} ︎Einja, Inc. All Rights Received</small
    >
  </v-footer>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';

export default defineComponent({
  components: { Button },
  setup() {
    const snsLinkIcons = ref(['mdi-facebook', 'mdi-twitter', 'mdi-instagram']);

    return {
      snsLinkIcons
    };
  }
});
</script>
<style lang="scss">
.v-footer {
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

  .footer-sns-links {
    display: flex;
    justify-content: center;

    > li + li {
      margin-left: 16px;
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
