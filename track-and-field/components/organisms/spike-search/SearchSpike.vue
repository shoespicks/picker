<template>
  <div class="organisms-search-spike">
    <aside>
      <SearchSpikeForm
        v-model="formValue"
        @search="search()"
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
import SearchSpikeForm from '~/components/organisms/spike-search/SearchSpikeForm.vue';
import { spikesStore } from '~/store';
import { ISpikesSearchFormValue } from '~/store/model/searchSpikeInput';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { SpikeList, SearchSpikeForm },
  props: {},
  setup() {
    const router = useRouter();

    const formValue = computed({
      get: () => spikesStore.searchFormValue,
      set: (val: ISpikesSearchFormValue) => {
        spikesStore.updateSearchFormValue(val);
      }
    });

    const search = () => {
      spikesStore.search(formValue.value);
    };

    onMounted(() => {
      search();
    });

    return {
      formValue,
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
