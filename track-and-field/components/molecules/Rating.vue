<template>
  <div class="spike-list-item-rating">
    <v-rating
      v-model="ratingValue"
      background-color="gray lighten"
      color="#383838"
      :size="size"
      dense
      half-increments
      :readonly="readonly"
    ></v-rating>
    <span :style="{ fontSize: `${numberSize}px` }">{{ ratingValue }}</span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 16
    },
    numberSize: {
      type: Number,
      default: 12
    },
    readonly: Boolean
  },
  setup(props, context) {
    return {
      ratingValue: computed({
        get: () => props.value,
        set: (val: number) => {
          context.emit('input', val);
        }
      })
    };
  }
});
</script>

<style lang="scss" scoped>
.spike-list-item-rating {
  display: flex;
  margin-left: -2px;
  align-items: center;

  ::v-deep .v-rating {
    > .v-icon {
      + .v-icon {
        margin-left: -4px;
      }
    }

    + * {
      margin-left: 4px;
    }
  }

  span {
    display: inline-flex;
  }
}
</style>
