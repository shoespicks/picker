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
            v-for="eventCategory in eventCategories"
            :key="eventCategory.id"
            class="search-launcher-events-button"
            outlined
            @click="search(eventCategory)"
            >{{ eventCategory.label }}</Button
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import { spikesStore } from '~/store';
import {
  IEventItem,
  shoeEventCategories,
  shoeEventsAndEventCategories
} from '~/types/shoes/shoeEvents';

export default defineComponent({
  components: { Button },
  setup() {
    const dialog = ref(false);

    const closeDialog = () => {
      dialog.value = false;
    };

    const router = useRouter();

    return {
      eventCategories: Object.values(shoeEventCategories),
      dialog,
      search: (event: IEventItem) => {
        event &&
          spikesStore.search({
            events: event.eventCodes.map(
              (code) => shoeEventsAndEventCategories[code]
            )
          });
        router.push('/search/');
        closeDialog();
      },
      closeDialog
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
