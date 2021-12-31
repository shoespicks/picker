<template>
  <h2>
    <span>{{ text }}</span>
    <span v-if="number < 2" class="background-text background-text--wide">
      01
    </span>
    <span v-else-if="number < 10" class="background-text">
      0{{ number.toString() }}
    </span>
    <span v-else class="background-text">
      {{ number.toString() }}
    </span>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    },
    number: {
      type: [Number],
      default: 1
    }
  }
});
</script>

<style lang="scss" scoped>
h2 {
  position: relative;
  display: flex;
  height: 160px;
  align-items: center;

  > span {
    position: absolute;
    top: 45%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }

  .background-text {
    font-family: 'DJB Get Digital', sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    color: #eef3f7;
    font-size: 120px;
    line-height: 160px;
    letter-spacing: 8px;

    &.background-text--wide {
      letter-spacing: 24px;
    }
  }
}
</style>
