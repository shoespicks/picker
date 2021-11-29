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
    <SearchLauncher>
      <template #activator="{ on, attrs }">
        <Button
          icon
          height="40"
          width="40"
          color="white"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon size="20">fas fa-search</v-icon>
        </Button>
      </template>
    </SearchLauncher>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import SearchLauncher from '~/components/organisms/SearchLauncher.vue';

export default defineComponent({
  components: { Button, SearchLauncher },
  setup() {}
});
</script>
<style lang="scss" scoped>
.molecules-search-launcher {
  height: 40px;
  width: 40px;
  color: #ffffff;
}

.molecules-search-launcher {
  right: -8px;
}

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
