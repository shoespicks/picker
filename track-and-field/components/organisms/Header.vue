<template>
  <div class="organisms-header-component">
    <v-app-bar
      app
      src="images/top/heroImage.png"
      fixed
      :height="height"
      color="#000000"
      dense
      shrink-on-scroll
      fade-img-on-scroll
    >
      <template #img="{ props }">
        <v-img v-bind="props">
          <slot name="imgContent"></slot>
        </v-img>
      </template>
      <!--      <v-app-bar-nav-icon @click="openSideMenu()"></v-app-bar-nav-icon>-->
      <NuxtLink class="header-logo" to="/">
        <img
          width="60"
          src="~static/images/logo/logo-text.svg"
          alt="shoespicks"
        />
      </NuxtLink>
      <v-spacer></v-spacer>
      <SearchLauncher>
        <template #activator="{ on, attrs }">
          <Button
            icon
            height="40"
            width="40"
            color="white"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon size="20">fas fa-search</v-icon>
          </Button>
        </template>
      </SearchLauncher>
    </v-app-bar>
    <!--    <v-navigation-drawer v-model="drawer" fixed border temporary dark>-->
    <!--      <div class="navigation-drawer-logo-container">-->
    <!--        <NuxtLink to="/">-->
    <!--          <img-->
    <!--            width="40"-->
    <!--            height="40"-->
    <!--            src="~static/images/logo/logo-square.svg"-->
    <!--            alt="shoespicks"-->
    <!--          />-->
    <!--        </NuxtLink>-->
    <!--      </div>-->
    <!--      <v-list nav dense>-->
    <!--        <v-list-item-group>-->
    <!--          <NuxtLink v-for="item in navItems" :key="item.label" :to="item.link">-->
    <!--            <v-list-item color="#fff" :ripple="false">-->
    <!--              <v-list-item-icon>-->
    <!--                <v-icon size="16">{{ item.icon }}</v-icon>-->
    <!--              </v-list-item-icon>-->
    <!--              <v-list-item-title>{{ item.label }}</v-list-item-title>-->
    <!--            </v-list-item>-->
    <!--          </NuxtLink>-->
    <!--        </v-list-item-group>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import SearchLauncher from '~/components/organisms/SearchLauncher.vue';

export default defineComponent({
  components: { Button, SearchLauncher },
  props: {
    height: { type: Number, default: 50 }
  },
  setup() {
    // const drawer = ref(false);
    // const navItems: IMenuItem[] = reactive([
    //   {
    //     id: 'search',
    //     label: 'スパイクを探す',
    //     icon: 'fas fa-search',
    //     link: '/spikes'
    //   },
    //   {
    //     id: 'hikaku',
    //     label: 'スパイクを比較する',
    //     icon: 'fas fa-arrows-alt-v',
    //     link: '/'
    //   },
    //   {
    //     id: 'favorite',
    //     label: 'お気に入りのスパイク',
    //     icon: 'fas fa-heart',
    //     link: '/'
    //   },
    //   {
    //     id: 'about',
    //     label: 'ShoesPicksとは？',
    //     icon: 'far fa-question-circle',
    //     link: '/'
    //   }
    // ]);

    // const openSideMenu = () => {
    //   drawer.value = true;
    // };

    return {
      // drawer,
      // navItems
      // openSideMenu
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-header-component {
  z-index: 10;

  ::v-deep .v-app-bar .v-toolbar__content {
    max-height: 50px;

    > .v-btn.v-btn--icon,
    .molecules-search-launcher {
      top: 5px;
      height: 40px;
      width: 40px;
      color: #ffffff;
    }

    .molecules-search-launcher {
      right: -8px;
    }

    .header-logo {
      display: inline-flex;
      position: absolute;
      left: 50%;
      top: 10px;
      transform: translateX(-50%);
      color: #ffffff;
    }
  }

  .v-navigation-drawer {
    padding-top: 16px;

    .navigation-drawer-logo-container {
      display: flex;
      justify-content: center;

      a {
        display: inline-flex;
      }
    }

    .v-list {
      margin-top: 8px;

      .v-list-item__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        margin-right: 16px;
      }
    }
  }
}
</style>
