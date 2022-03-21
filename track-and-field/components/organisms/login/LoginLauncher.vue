<template>
  <div class="molecules-login-launcher">
    <v-dialog v-if="!isLoggedIn" v-model="dialog" width="1000">
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
          新規
          <v-form v-if="!isConfirming">
            <div>
              <TextInput v-model="id" placeholder="ユーザ名"></TextInput>
              {{ id }}
              <TextInput
                v-model="email"
                class="mt-6"
                placeholder="メールアドレス"
              ></TextInput>
              {{ email }}
              <TextInput
                v-model="password"
                class="mt-6"
                placeholder="パスワード"
              ></TextInput>
              {{ password }}
              <Button class="mt-6" @click="signIn()">
                メールアドレスでログイン
              </Button>
              <Button class="mt-6" @click="signUp()"> 新規登録 </Button>
            </div>
          </v-form>
          <v-form v-else>
            <div>
              <p>ユーザ名：{{ id }}</p>
              <TextInput
                v-model="verificationCode"
                class="mt-6"
                placeholder="検証コード"
              ></TextInput>
              <Button class="mt-6" @click="confirmSignUp()">
                検証コードを確認
              </Button>
            </div>
          </v-form>
          <div class="d-flex justify-center pa-4">
            <Button @click="loginWithGoogle()">
              <v-icon size="18" left>fab fa-google</v-icon>
              Login with Google
            </Button>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <Button v-else width="180" @click="signOut($event)">ログアウト</Button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import TextInput from '~/components/atoms/TextInput.vue';
import { authStore } from '~/store';

export default defineComponent({
  components: { TextInput, Button },
  setup(_, context) {
    const dialog = ref(false);
    const isConfirming = ref(false);
    const id = ref('');
    const email = ref('');
    const password = ref('');
    const verificationCode = ref('');

    const closeDialog = () => {
      dialog.value = false;
    };

    return {
      isLoggedIn: computed(() => !!authStore.loginUser),
      dialog,
      isConfirming,
      id,
      email,
      password,
      verificationCode,
      existActivatorSlots: !!context.slots?.activator,
      loginWithGoogle: async () => {
        await authStore
          .loginWithGoogle()
          .then((t) => {
            console.log(t);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      signIn: async () => {
        await authStore
          .signIn({ id: id.value, password: password.value })
          .then((t) => {
            console.log(t);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      signUp: async () => {
        await authStore
          .signUp({
            id: id.value,
            email: email.value,
            password: password.value
          })
          .then((t) => {
            if (!t) {
              return;
            }
            isConfirming.value = true;
            console.log(t);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      confirmSignUp: async () => {
        await authStore
          .confirmSignUp({
            id: id.value,
            verificationCode: verificationCode.value
          })
          .then((t) => {
            if (!t) {
              return;
            }

            console.log(t);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      signOut: (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        authStore.signOut();
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
