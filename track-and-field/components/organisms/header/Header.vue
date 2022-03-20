<template>
  <v-app-bar :value="visible" app fixed :height="height" color="#000000" dense>
    <HeaderContetnt @clickHumberger="clickHumberger($event)"></HeaderContetnt>
  </v-app-bar>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import HeaderContetnt from '~/components/organisms/header/HeaderContetnt.vue';

export default defineComponent({
  components: { HeaderContetnt },
  props: {
    visible: { type: Boolean, default: true },
    height: { type: Number, default: null }
  },
  setup(_, context) {
    return {
      clickHumberger: (e: Event) => {
        context.emit('clickHumberger', e);
      }
    };
  }
});
</script>
<style lang="scss" scoped></style>
