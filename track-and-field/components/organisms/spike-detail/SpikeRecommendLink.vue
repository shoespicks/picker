<template>
  <section class="organisms-spike-recommend-link">
    <h3>このスパイクを見ている人にオススメ</h3>
    <ul>
      <li v-for="item in spike.recommendItems" :key="item.name">
        <router-link :to="`/search/${item.slug}`">
          <LinkItem
            :title="`${item.price.toLocaleString()}円（税込）`"
            :label="item.name"
            :caption="`${shoeBrands[item.brand].name} / ${
              shoeBrands[item.brand].nameEn
            }`"
            :image-url="item.colorVariationImage1[0]"
            :image-width="180"
            vertical
          ></LinkItem>
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import LinkItem from '~/components/molecules/links/LinkItem.vue';
import { ISpikeModel } from '~/store/model/spike';
import { shoeBrands } from '~/types/shoes/shoeBrands';

export default defineComponent({
  components: { LinkItem },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    }
  },
  setup() {
    return {
      shoeBrands
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-spike-recommend-link {
  > * + * {
    margin-top: 16px;
  }

  > ul {
    display: flex;
    padding: 16px;
    overflow-x: auto;

    > li {
      + li {
        margin-left: 16px;
      }
    }
  }
}
</style>
