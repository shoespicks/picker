<template>
  <v-text-field
    v-model="inputValue"
    :label="label"
    :placeholder="placeholder"
    :filled="filled"
    :outlined="outlined"
    :dark="dark"
    :append-icon="appendIcon"
    :append-outer-icon="appendOuterIcon"
    hide-details
    dense
    @click:append="clickAppend($event)"
    @click:append-outer="clickAppendOuter($event)"
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
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    appendIcon: {
      type: String,
      default: null
    },
    appendOuterIcon: {
      type: String,
      default: null
    },
    outlined: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    }
  },

  setup(props, context) {
    return {
      clickAppend: (event: Event) => {
        context.emit('click:append', event);
      },
      clickAppendOuter: (event: Event) => {
        context.emit('click:append-outer', event);
      },
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

<style lang="scss" scoped>
::v-deep {
  .v-input__icon {
    .v-icon {
      font-size: 1rem;
    }
  }
}
</style>
