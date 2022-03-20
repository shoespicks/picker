<template>
  <div
    style="
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      color: white;
    "
  >
    <Button
      color="white"
      height="40"
      width="40"
      icon
      dark
      @click="clickHumberger($event)"
    >
      <v-icon size="18" dark>fas fa-bars</v-icon>
    </Button>
    <v-spacer></v-spacer>
    <NuxtLink class="header-logo" to="/">
      <img
        width="80"
        src="~static/images/logo/logo-text.svg"
        alt="shoespicks"
      />
    </NuxtLink>
    <KeywordSearchLauncher class="d-none d-sm-block"></KeywordSearchLauncher>
    <NuxtLink to="/search">
      <Button
        class="d-block d-sm-none"
        color="white"
        height="40"
        width="40"
        icon
        dark
        small
      >
        <v-icon size="18" dark>fas fa-search</v-icon>
      </Button>
    </NuxtLink>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import KeywordSearchLauncher from '~/components/organisms/search-launcher/KeywordSearchLauncher.vue';

export default defineComponent({
  components: { Button, KeywordSearchLauncher },
  setup(_, context) {
    return {
      clickHumberger: (e: Event) => {
        context.emit('clickHumberger', e);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.header-logo {
  display: inline-flex;
  position: absolute;
  justify-content: center;
  left: 50%;
  height: 32px;
  width: 88px;
  transform: translateX(-50%);
  color: #ffffff;
}
</style>
