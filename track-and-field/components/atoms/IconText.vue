<template>
  <span class="atoms-icon-text">
    <v-icon v-if="!right" :size="iconSize || size">{{ icon }}</v-icon>
    <span :style="{ fontSize: size + 'px' }">
      <slot></slot>
    </span>
    <v-icon v-if="right" :size="iconSize || size">{{ icon }}</v-icon>
  </span>
</template>
<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    // 数字か数字の文字列
    size: {
      type: [String, Number],
      default: 16
    },
    // 数字か数字の文字列
    iconSize: {
      type: [String, Number],
      default: null
    },
    right: Boolean
  },
  setup() {
    const dialog = ref(false);

    const closeDialog = () => {
      dialog.value = false;
    };

    const router = useRouter();

    const search = (path: string) => {
      router.push(`/spikes/${path}`);
      closeDialog();
    };

    return {
      dialog,
      closeDialog,
      search
    };
  }
});
</script>
<style lang="scss" scoped>
.atoms-icon-text {
  display: inline-flex;
  align-items: center;

  > * {
    display: inline-flex;

    + * {
      margin-left: 0.3em;
    }
  }
}
</style>
