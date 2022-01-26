<template>
  <ul
    class="d-flex pt-2 pb-2 pl-1 pr-1 align-stretch"
    :class="{ 'overflow-x-auto': !vertical, 'flex-column': vertical }"
  >
    <li
      v-for="(item, index) in spikes"
      :key="item.id"
      class="flex-grow-0 flex-shrink-0"
      :class="{ 'ml-4': !vertical && index > 0, 'mt-3': vertical && index > 0 }"
    >
      <router-link :to="`/search/${item.slug}`">
        <SimpleSpikeListItem
          :title="`${item.price.toLocaleString()}円（税込）`"
          :label="item.name"
          :caption="
            `${shoeBrands[item.brand].name} / ${
              shoeBrands[item.brand].nameEn
            } ` + (item.releaseYear || '')
          "
          :image-url="item.colorVariationImage1[0]"
          :image-width="180"
          vertical
          @click="clickItem(item)"
        ></SimpleSpikeListItem>
      </router-link>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import SimpleSpikeListItem from '~/components/molecules/spike-list/SimpleSpikeListItem.vue';
import { ISpikeModel } from '~/store/model/spike';
import { shoeBrands } from '~/types/shoes/shoeBrands';

export default defineComponent({
  components: { SimpleSpikeListItem },
  props: {
    spikes: {
      type: Array as PropType<ISpikeModel[]>,
      required: true
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(_, context) {
    return {
      shoeBrands,
      clickItem: (spike: ISpikeModel) => {
        context.emit('clickItem', spike);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
ul {
  width: 100%;
}
</style>
