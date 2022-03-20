<template>
  <v-app app>
    <Header :visible="visibleHeader" @clickHumberger="toggleDrawer()"></Header>
    <div v-if="!visibleHeader" class="fixed-header-content">
      <HeaderContetnt @clickHumberger="toggleDrawer()"></HeaderContetnt>
    </div>
    <NavigationDrawer v-model="drawerOpen"></NavigationDrawer>
    <div v-intersect="onHeroVideoIntersect" class="hero-video-container">
      <video
        class="hero-video"
        src="~static/movies/hero-movie.mp4"
        poster="~static/images/top/heroImage.jpg"
        muted
        autoplay
        playsinline
        loop
      ></video>
      <div class="hero-video-filter"></div>
      <div class="hero-video-content">
        <section class="top-layout-heroimage-logo-container">
          <h1>
            データでカンタン比較<br />
            陸上選手のためのスパイク検索サイト
          </h1>
          <img
            width="320"
            src="~static/images/logo/logo-square.svg"
            alt="shoespicks"
          />
          <div class="top-layout-heroimage-search-container">
            <EventSearchLauncher>
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
                      >
                        <v-icon size="18" left>fas fa-search</v-icon>
                        探す
                      </Button>
                    </template>
                  </v-text-field>
                </div>
              </template>
            </EventSearchLauncher>
          </div>
        </section>
      </div>
    </div>
    <v-main>
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import HeaderContetnt from '~/components/organisms/header/HeaderContetnt.vue';
import NavigationDrawer from '~/components/organisms/navigation-drawer/NavigationDrawer.vue';
import EventSearchLauncher from '~/components/organisms/search-launcher/EventSearchLauncher.vue';
import Footer from '~/components/organisms/Footer.vue';
import Header from '~/components/organisms/header/Header.vue';

export default defineComponent({
  name: 'TopLayout',
  components: {
    NavigationDrawer,
    HeaderContetnt,
    Button,
    EventSearchLauncher,
    Header,
    Footer
  },
  setup() {
    const visibleHeader = ref(false);
    const drawerOpen = ref(false);

    // 動画より下にスクロールされたときにヘッダーが表示されるようにする
    const onHeroVideoIntersect = (entries: any) => {
      visibleHeader.value = entries[0].intersectionRatio === 0;
    };

    return {
      visibleHeader,
      drawerOpen,
      onHeroVideoIntersect,
      toggleDrawer: () => {
        drawerOpen.value = !drawerOpen.value;
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.fixed-header-content {
  position: fixed;
  padding: 4px 16px;
  width: 100%;
  height: 40px;
  z-index: 1;
}

.top-layout-heroimage-logo-container {
  position: absolute;
  display: flex;
  left: 50%;
  top: 46%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;

  > * {
    + * {
      margin-top: 32px;
    }
  }

  h1 {
    text-align: center;
    font-size: 20px;
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

.hero-video-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .hero-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    filter: saturate(24%) blur(3px);

    + .hero-video-filter {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.1);
      background-image: radial-gradient(#111 30%, transparent 31%),
        radial-gradient(#111 30%, transparent 31%);
      background-size: 4px 4px;
      background-position: 0 0, 2px 2px;
      background-repeat: repeat;
    }
  }
}
</style>
