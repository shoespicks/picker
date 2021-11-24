<template>
  <div>
    <v-checkbox
      v-for="item in items"
      :key="item[itemValue]"
      v-model="selectedValue"
      :label="item[itemLabel]"
      :value="item[itemValue]"
      :ripple="false"
      hide-details
    ></v-checkbox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    value: {
      type: [Array],
      default: null
    },
    items: {
      type: Array,
      required: true
    },
    itemValue: {
      type: String,
      default: ''
    },
    itemLabel: {
      type: String,
      default: ''
    }
  },

  setup(props, context) {
    return {
      selectedValue: computed({
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
