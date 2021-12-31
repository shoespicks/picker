<template>
  <div class="organisms-search-spike">
    <aside>
      <SearchSpikeForm
        :event="event"
        @search="search($event)"
      ></SearchSpikeForm>
    </aside>
    <SpikeList :spikes="spikes" @clickItem="clickItem($event)"></SpikeList>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  useRouter
} from '@nuxtjs/composition-api';
import SpikeList from '~/components/molecules/spikeList/SpikeList.vue';
import SearchSpikeForm from '~/components/organisms/search-spike/SearchSpikeForm.vue';
import { spikesStore } from '~/store';
import { ISpikesSearchFormValue } from '~/store/model/searchSpikeInput';
import { ISpikeModel } from '~/store/model/spike';
import { IEventItem } from '~/types/shoes/shoeEvents';

export default defineComponent({
  components: { SpikeList, SearchSpikeForm },
  props: {
    event: {
      type: Object as PropType<IEventItem>,
      default: null
    }
  },
  setup(props) {
    const router = useRouter();

    const search = (searchFormValue: ISpikesSearchFormValue) => {
      spikesStore.search(searchFormValue);
    };

    onMounted(() => {
      search({ eventOrEventCategory: props.event });
    });

    return {
      spikes: computed(() => spikesStore.spikes),
      search,
      clickItem: (val: ISpikeModel) => {
        router.push(`/search/${val.slug}`);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-search-spike {
  width: 100%;
  display: flex;

  > * {
    flex: 0 0 auto;

    + * {
      flex: 1 1 auto;
      width: 1px;
      margin-left: 24px;
    }
  }
}
</style>
