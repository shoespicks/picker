<template>
  <v-app class="app-default-layout">
    <Header @clickHumberger="toggleDrawer()"></Header>
    <NavigationDrawer v-model="drawerOpen"></NavigationDrawer>
    <v-main class="app-default-layout-content">
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

import Footer from '~/components/organisms/Footer.vue';
import Header from '~/components/organisms/header/Header.vue';
import NavigationDrawer from '~/components/organisms/navigation-drawer/NavigationDrawer.vue';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Header,
    Footer,
    NavigationDrawer
  },
  setup() {
    const drawerOpen = ref(false);

    return {
      drawerOpen,
      toggleDrawer: () => {
        drawerOpen.value = !drawerOpen.value;
      }
    };
  }
});
</script>

<style lang="scss">
.app-default-layout {
  .default-layout-heroimage-logo-container {
    position: absolute;
    display: flex;
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;

    > * {
      + * {
        margin-top: 8px;
      }
    }

    h2 {
      font-size: 16px;
    }
  }

  main.app-default-layout-content {
    .page-content {
      * + article {
        margin-top: 16px;
      }
    }
  }
}
</style>
