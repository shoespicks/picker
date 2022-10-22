<template>
  <div class="page-content">
    <SearchSpike></SearchSpike>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import SearchSpike from '~/components/organisms/spike-search/SearchSpike.vue';

export default defineComponent({
  components: { SearchSpike },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped></style>
