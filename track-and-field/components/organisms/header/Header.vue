<template>
  <v-app-bar :value="visible" app fixed :height="height" color="#000000" dense>
    <HeaderContetnt></HeaderContetnt>
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
  setup() {}
});
</script>
<style lang="scss" scoped></style>
