<template>
  <div class="page-content">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <h2>スパイク検索結果</h2>
    <SearchSpike :event="event"></SearchSpike>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute
} from '@nuxtjs/composition-api';
import SearchSpike from '~/components/organisms/search-spike/SearchSpike.vue';
import { EventCategoryCode, shoeEventCategory } from '~/types/shoes/shoeEvents';

export default defineComponent({
  components: { SearchSpike },
  setup() {
    const route = useRoute();
    const event = computed(
      () => shoeEventCategory[route.value.params.events as EventCategoryCode]
    );
    const items = ref([
      {
        text: 'ShoesPicks',
        href: '/'
      },
      {
        text: 'スパイクを探す',
        href: '/search'
      }
    ]);
    return {
      event,
      items
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
