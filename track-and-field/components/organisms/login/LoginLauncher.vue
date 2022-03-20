<template>
  <div class="molecules-login-launcher">
    <v-dialog v-model="dialog" width="1000">
      <template #activator="{ on, attrs }">
        <slot name="activator" v-bind="{ on, attrs }"></slot>
        <Button
          v-if="!existActivatorSlots"
          width="180"
          @click="dialog = !dialog"
          >ログイン</Button
        >
      </template>

      <v-card>
        <v-card-title>
          ログイン
          <Button icon color="gray" @click="closeDialog()">
            <v-icon>fas fa-times</v-icon>
          </Button>
        </v-card-title>
        <v-divider></v-divider>
        <div class="login-content">
          <div class="d-flex justify-center pa-4">
            <Button @click="loginWithGoogle()">
              <v-icon size="18" left>fab fa-google</v-icon>
              Login with Google
            </Button>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import { authStore } from '~/store';

export default defineComponent({
  components: { Button },
  setup(_, context) {
    const dialog = ref(false);

    const closeDialog = () => {
      dialog.value = false;
    };

    return {
      dialog,
      existActivatorSlots: !!context.slots?.activator,
      loginWithGoogle: async () => {
        await authStore.loginWithGoogle();
        closeDialog();
      },
      closeDialog
    };
  }
});
</script>
<style lang="scss" scoped>
.molecules-login-launcher {
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

  .login-content {
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
