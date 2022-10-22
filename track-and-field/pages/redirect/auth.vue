<template>
  <div class="page-content">認証リダイレクト中♪</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api';
import { authStore } from '~/store';

export default defineComponent({
  setup() {
    onMounted(async () => {
      console.log('1回目');
      await authStore.fetchLoginUser();

      setTimeout(() => {
        console.log('2回目');
        authStore.fetchLoginUser();
      }, 10000);
    });
  }
});
</script>
<style lang="scss" scoped></style>
