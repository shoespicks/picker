<template>
  <v-navigation-drawer v-model="drawerOpen" fixed dark>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <div class="d-flex justify-center pa-4">
      <LoginLauncher></LoginLauncher>
    </div>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import LoginLauncher from '~/components/organisms/login/LoginLauncher.vue';

export default defineComponent({
  components: { LoginLauncher },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ],
      drawerOpen: computed({
        get: () => props.value,
        set: (val: boolean) => {
          context.emit('change', val);
        }
      })
    };
  }
});
</script>
<style lang="scss" scoped></style>
