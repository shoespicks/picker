<template>
  <v-container class="molecules-spike-list">
    <v-row>
      <v-col
        v-for="spike in spikes"
        :key="spike.id"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <SpikeListItem
          class="spike-list-item"
          :spike="spike"
          @click="clickItem(spike)"
        ></SpikeListItem>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import SpikeListItem from '~/components/molecules/spikeList/SpikeListItem.vue';
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

  .spike-list-item {
    height: 100%;
  }
}
</style>
