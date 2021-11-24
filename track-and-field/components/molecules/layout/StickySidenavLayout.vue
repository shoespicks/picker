<template>
  <div class="molecules-sticky-sidemav-layout">
    <div class="content-container">
      <slot></slot>
    </div>
    <div class="sidenav-backdrop">
      <Container
        class="sidenav-container"
        :max-width="containerMaxWidth"
        :class="{ 'sidenav-container--right': right }"
        :style="{ top: stickyContainerTopPx + 'px' }"
      >
        <div class="sidenav-content">
          <slot name="sidenav"></slot>
        </div>
      </Container>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Container from '~/components/atoms/Container.vue';

export default defineComponent({
  components: { Container },
  props: {
    stickyContainerTopPx: {
      type: Number,
      default: 80
    },
    containerMaxWidth: {
      type: Number,
      default: 1244
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
// この画面幅より小さい時サイドナビ非表示
$sideNavBreakPoint: 768px;

.molecules-sticky-sidemav-layout {
  position: relative;
}

.sidenav-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  padding: 32px;
  pointer-events: none;

  .sidenav-container {
    position: sticky;
  }

  .sidenav-container--right {
    display: flex;
    justify-content: flex-end;
  }

  .sidenav-content {
    z-index: 1;
    pointer-events: auto;
  }

  @media screen and (max-width: $sideNavBreakPoint) {
    display: none;
  }
}
</style>
