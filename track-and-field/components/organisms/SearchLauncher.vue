<template>
  <div class="molecules-search-launcher">
    <v-dialog v-model="dialog" width="1000">
      <template #activator="{ on, attrs }">
        <slot name="activator" v-bind="{ on, attrs }"></slot>
      </template>

      <v-card>
        <v-card-title>
          種目絞り込み
          <Button icon color="gray" @click="closeDialog()"
            ><v-icon>fas fa-times</v-icon></Button
          >
        </v-card-title>
        <v-divider></v-divider>
        <div class="search-launcher-content">
          <Button
            class="search-launcher-events-button"
            outlined
            @click="search('100m')"
            >100m</Button
          >
          <Button
            class="search-launcher-events-button"
            outlined
            @click="search('200m')"
            >200m</Button
          >
          <Button
            class="search-launcher-events-button"
            outlined
            @click="search('400m')"
            >400m</Button
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';

export default defineComponent({
  components: { Button },
  setup() {
    const dialog = ref(false);

    const closeDialog = () => {
      dialog.value = false;
    };

    const router = useRouter();

    const search = (path: string) => {
      router.push(`/search?events=${path}`);
      closeDialog();
    };

    return {
      dialog,
      closeDialog,
      search
    };
  }
});
</script>
<style lang="scss" scoped>
.molecules-search-launcher {
  position: relative;
}

.v-dialog {
  .v-card__title {
    height: 50px;
    padding: 8px 16px;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 700;
  }

  .search-launcher-content {
    padding: 24px;

    > * {
      + * {
        margin-top: 16px;
      }
    }

    .search-launcher-events-button {
      width: 100%;
    }
  }
}
</style>
