<template>
  <div class="page-content">
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <SearchSpike></SearchSpike>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import SearchSpike from '~/components/organisms/spike-search/SearchSpike.vue';

export default defineComponent({
  components: { SearchSpike },
  setup() {
    return {
      breadcrumbs: [
        {
          text: 'ShoesPicks',
          href: '/'
        },
        {
          text: 'スパイクを探す',
          href: '/search'
        }
      ]
    };
  }
});
</script>
<style lang="scss" scoped>
.page-content {
  padding: 24px 24px 64px;

  h2 {
    font-size: 20px;
    + * {
      margin-top: 24px;
    }
  }

  .v-breadcrumbs {
    + * {
      margin-top: 8px;
    }
  }
}
</style>
