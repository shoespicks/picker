<template>
  <div class="organisms-search-spike">
    <aside>
      <SearchSpikeForm
        :default-value="savedSearchFormValue"
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
  useRouter
} from '@nuxtjs/composition-api';
import SpikeList from '~/components/molecules/spikeList/SpikeList.vue';
import SearchSpikeForm from '~/components/organisms/search-spike/SearchSpikeForm.vue';
import { spikesStore } from '~/store';
import { ISpikesSearchFormValue } from '~/store/model/searchSpikeInput';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { SpikeList, SearchSpikeForm },
  props: {},
  setup() {
    const router = useRouter();

    const savedSearchFormValue: ISpikesSearchFormValue = {
      eventOrEventCategory: undefined,
      keyword: undefined,
      brands: [],
      level: [],
      priceRange: [0, 50000],
      trackType: {
        forAllWeatherTrack: false,
        forDirtTrack: false
      },
      // TODO 直近3〜2年にする
      releaseYears: [],
      shoeLaceTypes: [],
      colors: [],
      ...spikesStore.searchFormValue
    };

    const search = (searchFormValue: ISpikesSearchFormValue) => {
      spikesStore.search(searchFormValue);
    };

    onMounted(() => {
      console.log('onMounted');
      console.log(savedSearchFormValue);
      search(savedSearchFormValue);
    });

    return {
      savedSearchFormValue,
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
