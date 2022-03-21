<template>
  <div class="page-content">認証リダイレクト中♪</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api';
import { authStore } from '~/store';

export default defineComponent({
  setup() {
    onMounted(async () => {
      authStore.listenAuth();

      console.log('1回目');
      await authStore.fetchLoginUser().then();

      setTimeout(() => {
        console.log('2回目');
        authStore.fetchLoginUser().then();
      }, 10000);
    });
  }
});
</script>
<style lang="scss" scoped></style>
