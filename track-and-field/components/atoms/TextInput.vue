<template>
  <v-text-field
    v-model="inputValue"
    :label="label"
    :placeholder="placeholder"
    hide-details
    dense
    outlined
  ></v-text-field>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  setup(props, context) {
    return {
      inputValue: computed({
        get: () => props.value,
        set: (val: string) => {
          context.emit('input', val);
        }
      })
    };
  }
});
</script>

<style lang="scss" scoped></style>
