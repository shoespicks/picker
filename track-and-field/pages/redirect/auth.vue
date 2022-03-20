<template>
  <div class="page-content">認証リダイレクト中♪</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api';
import { authStore } from '~/store';

export default defineComponent({
  setup() {
    onMounted(() => {
      authStore.listenAuth();
    });
  }
});
</script>
<style lang="scss" scoped></style>
