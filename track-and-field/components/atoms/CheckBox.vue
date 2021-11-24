<template>
  <v-checkbox
    v-model="checkedValue"
    :label="label"
    :ripple="false"
    hide-details
  ></v-checkbox>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: null
    },
    label: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    return {
      checkedValue: computed({
        get: () => props.value,
        set: (val: any) => {
          context.emit('input', val);
        }
      })
    };
  }
});
</script>

<style lang="scss" scoped></style>
