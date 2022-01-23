<template>
  <div
    style="
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    "
  >
    <v-spacer></v-spacer>
    <NuxtLink class="header-logo" to="/">
      <img
        width="80"
        src="~static/images/logo/logo-text.svg"
        alt="shoespicks"
      />
    </NuxtLink>
    <KeywordSearchLauncher></KeywordSearchLauncher>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import KeywordSearchLauncher from '~/components/organisms/search-launcher/KeywordSearchLauncher.vue';

export default defineComponent({
  components: { KeywordSearchLauncher },
  setup() {}
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
