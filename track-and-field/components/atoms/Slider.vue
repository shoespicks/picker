<template>
  <v-range-slider
    v-model="rangeValue"
    :step="step"
    :max="max"
    :min="min"
    hide-details
  ></v-range-slider>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    value: {
      type: [Array],
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: 1
    }
  },

  setup(props, context) {
    return {
      rangeValue: computed({
        get: () => props.value,
        set: (val: any) => {
          context.emit('input', val);
        }
      })
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep .v-slider {
  cursor: pointer;

  .v-slider__thumb-container {
    &:hover {
      .v-slider__thumb:before {
        transform: scale(0.6);
      }
    }
  }

  .v-slider__thumb-container--focused {
    .v-slider__thumb:before {
      transform: scale(0.5);
    }

    &:hover {
      .v-slider__thumb:before {
        transform: scale(0.6);
      }
    }
  }

  .v-slider__thumb-container--active {
    .v-slider__thumb:before {
      // vuetify側が!importantしているのを仕方なく打ち消し
      transform: scale(0.7) !important;
    }
  }
}
</style>
