<template>
  <v-form @submit.prevent="search()">
    <div class="d-inline-flex align-center">
      <TextInput
        v-model="keyword"
        placeholder="キーワードで検索"
        append-icon="fas fa-search"
        dark
        @click:append="search()"
        @keydown.enter="search()"
      ></TextInput>
    </div>
  </v-form>
</template>
<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api';
import TextInput from '~/components/atoms/TextInput.vue';
import { spikesStore } from '~/store';

export default defineComponent({
  components: {
    TextInput
  },
  props: {},
  setup() {
    const router = useRouter();
    const keyword = ref<string>('');

    const search = () => {
      spikesStore.search({
        keyword: keyword.value
      });
      router.push('/search');
    };

    return {
      keyword,
      search
    };
  }
});
</script>
<style lang="scss" scoped>
::v-deep {
  .v-input {
    input {
      font-size: 0.875rem;
    }
  }
}
</style>
