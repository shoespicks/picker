<template>
  <div
    class="atoms-container"
    :style="{ 'max-width': maxWidth + 'px', padding: padding }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    maxWidth: {
      type: Number,
      default: 980
    },
    padding: {
      type: String,
      default: null
    }
  },
  setup() {}
});
</script>

<style lang="scss" scoped>
.atoms-container {
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
</style>
