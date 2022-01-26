<template>
  <v-row class="molecules-spike-list">
    <v-col
      v-for="spike in spikes"
      :key="spike.id"
      class="molecules-spike-list-col"
      cols="12"
      lg="6"
    >
      <SpikeListItem
        class="spike-list-item"
        :spike="spike"
        @click="clickItem(spike)"
      ></SpikeListItem>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import SpikeListItem from '~/components/molecules/spike-list/SpikeListItem.vue';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { SpikeListItem },
  props: {
    spikes: {
      type: Array as PropType<ISpikeModel[]>,
      required: true
    }
  },
  setup(_, context) {
    return {
      clickItem: (spike: ISpikeModel) => {
        context.emit('clickItem', spike);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.molecules-spike-list {
  position: relative;

  .molecules-spike-list-col {
    margin-bottom: 24px;
  }
}
</style>
