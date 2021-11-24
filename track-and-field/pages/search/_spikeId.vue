<template>
  <div v-if="!!spike" class="page-content">
    <Container :max-width="1244" padding="0 34px">
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </Container>
    <SpikeDetail :spike="spike"></SpikeDetail>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useRoute
} from '@nuxtjs/composition-api';
import Container from '~/components/atoms/Container.vue';
import SpikeDetail from '~/components/organisms/spike-detail/SpikeDetail.vue';
import { spikesStore } from '~/store';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { Container, SpikeDetail },
  setup() {
    const route = useRoute();

    const spike = ref<ISpikeModel>();

    const breadcrumbs = ref<
      { text: string; href?: string; disabled?: boolean }[]
    >([
      {
        text: 'ShoesPicks',
        href: '/'
      },
      {
        text: 'スパイクを探す',
        href: '/search'
      }
    ]);

    useFetch(async () => {
      spike.value = await spikesStore.getBySlug(
        `${route.value.params.spikeId}`
      );

      breadcrumbs.value.push({
        text: spike.value.name,
        disabled: true
      });
      console.log('_spikeId.vueのuseFetchで取得 ' + spike.value?.name);
      console.log(spike.value);
    });

    return {
      breadcrumbs,
      spike
    };
  }
});
</script>
<style lang="scss" scoped>
.page-content {
  padding-top: 24px;

  > .container {
    + * {
      margin-top: 8px;
    }
  }
}
</style>
