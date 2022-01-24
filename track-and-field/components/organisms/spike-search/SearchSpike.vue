<template>
  <div class="organisms-search-spike">
    <aside class="d-none d-md-flex">
      <SearchSpikeForm
        v-model="formValue"
        :show-search-button="false"
        vertical
      ></SearchSpikeForm>
      <div class="fixed-search-button-container">
        <Button type="submit" full @click="search()">検索</Button>
      </div>
    </aside>
    <div class="spike-list-container">
      <div class="spike-list-header">
        <v-card class="d-flex d-md-none pa-6">
          <SearchSpikeForm
            v-model="formValue"
            @search="search()"
          ></SearchSpikeForm
        ></v-card>
        <div
          class="
            spike-list-header-title
            d-flex
            align-center
            justify-space-between
          "
        >
          <h1 class="d-none d-sm-block">スパイク検索結果一覧</h1>
          <div class="d-flex align-center">
            <div style="width: 200px">
              <Select
                :value="formValue.order"
                :items="searchOrder"
                item-value="id"
                item-text="label"
                :outlined="false"
                placeholder="並び替え"
                @input="changeOrder($event)"
              ></Select>
            </div>
            <span v-if="spikes.length" class="ml-3"
              >検索結果 {{ spikes.length }} 件</span
            >
          </div>
        </div>
      </div>
      <SpikeList :spikes="spikes" @clickItem="clickItem($event)"></SpikeList>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  useRouter
} from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import Select from '~/components/atoms/Select.vue';
import SpikeList from '~/components/molecules/spikeList/SpikeList.vue';
import SearchSpikeForm from '~/components/organisms/spike-search/SearchSpikeForm.vue';
import { spikesStore } from '~/store';
import { ISpikesSearchFormInputs } from '~/store/model/searchSpikeInput';
import { ISpikeModel } from '~/store/model/spike';
import {
  IShoeSearchOrder,
  shoeSearchOrders
} from '~/types/shoes/shoeSearchOrder';

export default defineComponent({
  components: { SpikeList, SearchSpikeForm, Button, Select },
  props: {},
  setup() {
    const router = useRouter();

    const formValue = computed({
      get: () => spikesStore.searchFormInputs,
      set: (val: ISpikesSearchFormInputs) => {
        spikesStore.updateSearchForm(val);
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
      searchOrder: Object.values(shoeSearchOrders),
      spikes: computed(() => spikesStore.spikes),
      search,
      clickItem: (val: ISpikeModel) => {
        router.push(`/search/${val.slug}`);
      },
      changeOrder: (order: IShoeSearchOrder) => {
        spikesStore.changeSearchFormValue({ order });
        search();
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-search-spike {
  width: 100%;
  height: 100%;
  display: flex;

  > aside {
    flex: 0 0 auto;
    position: sticky;
    display: flex;
    flex-direction: column;
    top: 48px;
    width: 240px;
    height: calc(100vh - 48px);

    > .organisms-search-spike-form {
      flex: 1 1 auto;
      padding: 24px;
      overflow: auto;

      + .fixed-search-button-container {
        flex: 0 0 auto;
        padding: 16px;
        width: 100%;
      }
    }

    + * {
      flex: 1 1 auto;
      width: 1px;
      padding: 24px;
    }
  }

  .spike-list-container {
    background-color: #f9fafa;

    .spike-list-header {
      > * + * {
        margin-top: 16px;
      }

      h1 {
        font-size: 1.25rem;
      }

      & + * {
        margin-top: 16px;
      }
    }
  }
}
</style>
