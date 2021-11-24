<template>
  <v-app class="app-top-layout">
    <Header :height="800">
      <template #imgContent>
        <section class="top-layout-heroimage-logo-container">
          <h1>陸上競技者のためのシューズ検索サイト</h1>
          <img
            width="180"
            height="180"
            src="~static/images/logo/logo-square.svg"
            alt="shoespicks"
          />
          <div class="top-layout-heroimage-search-container">
            <SearchLauncher>
              <template #activator="{ on, attrs }">
                <div
                  class="top-layout-heroimage-search-form"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-text-field
                    label="種目から探す"
                    placeholder="種目から探す"
                    height="62"
                    :hide-details="true"
                    rounded
                    solo
                    readonly
                    full-width
                  >
                    <template #append>
                      <Button
                        color="accent"
                        height="52"
                        width="100"
                        elevation="1"
                        rounded
                        ><v-icon size="18" left>fas fa-search</v-icon
                        >探す</Button
                      >
                    </template>
                  </v-text-field>
                </div>
              </template>
            </SearchLauncher>
          </div>
        </section>
      </template>
    </Header>
    <main class="app-top-layout-content">
      <Nuxt />
    </main>
    <Footer />
  </v-app>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import SearchLauncher from '~/components/organisms/SearchLauncher.vue';
import Footer from '~/components/organisms/Footer.vue';
import Header from '~/components/organisms/Header.vue';

export default defineComponent({
  components: {
    Button,
    SearchLauncher,
    Header,
    Footer
  },
  setup() {}
});
</script>
<style lang="scss" scoped>
.app-top-layout {
  .top-layout-heroimage-logo-container {
    position: absolute;
    display: flex;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;

    > * {
      + * {
        margin-top: 32px;
      }
    }

    h1 {
      font-size: 16px;
    }
  }

  .top-layout-heroimage-search-container {
    width: 360px;
    margin-top: 60px;

    .top-layout-heroimage-search-form {
      ::v-deep .v-input {
        cursor: pointer;
        border-radius: 200px;
        border: 1px solid #ddd;

        > .v-input__control {
          > .v-input__slot {
            cursor: pointer;

            > .v-text-field__slot {
              cursor: pointer;

              > * {
                cursor: pointer;
              }
            }
          }
        }
      }

      .v-btn {
        position: relative;
        right: -18px;
      }
    }
  }

  .app-top-layout-content {
    margin-top: 800px;
  }
}
</style>
