<template>
  <v-btn
    v-bind="$props"
    :ripple="false"
    :width="full ? '100%' : width"
    @click="onClick($event)"
  >
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    icon: Boolean,
    loading: Boolean,
    outlined: Boolean,
    plain: Boolean,
    retainFocusOnClick: Boolean,
    rounded: Boolean,
    dark: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    text: Boolean,
    tile: Boolean,
    full: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    value: {
      type: [String, Number, Object],
      default: null
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    color: {
      type: [String],
      default: 'primary'
    },
    elevation: {
      type: [Number, String],
      default: null
    }
  },

  setup(_, context: SetupContext) {
    const onClick = (e: MouseEvent) => {
      context.emit('click', e);
    };

    return {
      onClick
    };
  }
});
</script>

<style lang="scss" scoped></style>
