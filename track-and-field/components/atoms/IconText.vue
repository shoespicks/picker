<template>
  <span
    class="atoms-icon-text d-inline-flex"
    :class="{ 'align-center': !label || !description }"
  >
    <v-icon :size="iconSize || labelSize">{{ icon }}</v-icon>
    <span v-if="label || description" class="text-container">
      <span v-if="label">{{ label }}</span>
      <small v-if="description">{{ description }}</small>
    </span>
    <span v-else :style="{ fontSize: labelSize + 'px' }">
      <slot></slot>
    </span>
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
    label: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    iconSize: {
      type: [String, Number],
      default: null
    },
    labelSize: {
      type: [String, Number],
      default: 16
    },
    descriptionSize: {
      type: [String, Number],
      default: 12
    }
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
  align-items: flex-start;

  > * {
    display: inline-flex;

    + * {
      margin-left: 0.5em;
    }

    + .text-container {
      margin-left: 1em;
    }
  }

  > .text-container {
    display: inline-flex;
    flex-direction: column;

    > span {
      font-weight: 500;

      + small {
        margin-top: 2px;
        color: gray;
      }
    }
  }
}
</style>
