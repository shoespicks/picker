<template>
  <section
    v-if="spike.recommendItems && spike.recommendItems.length > 0"
    class="organisms-spike-recommend-link"
  >
    <h3>このスパイクを見ている人にオススメ</h3>
    <SimpleSpikeList
      :spikes="spike.recommendItems"
    ></SimpleSpikeList>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import SimpleSpikeList from '~/components/molecules/spike-list/SimpleSpikeList.vue';
import { ISpikeModel } from '~/store/model/spike';
import { shoeBrands } from '~/types/shoes/shoeBrands';

export default defineComponent({
  components: { SimpleSpikeList },
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
}
</style>
