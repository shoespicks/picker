<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :width="width"
      :elevation="hover ? 2 : 0"
      :ripple="false"
      :hover="true"
    >
      <div class="link-item" :class="{ 'link-item--vertical': vertical }">
        <div class="flex-shrink-0">
          <v-img
            class='ma-auto'
            :src="imageUrl"
            :width="imageWidth"
            :height="imageHeight"
          ></v-img>
        </div>
        <div class="label-container">
          <small>{{ caption }}</small>
          <p>{{ label }}</p>
          <strong>{{ title }}</strong>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 200
    },
    imageUrl: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    },
    imageWidth: {
      type: Number,
      default: null
    },
    imageHeight: {
      type: Number,
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup() {}
});
</script>
<style lang="scss" scoped>
.v-card {
  .link-item {
    width: 100%;

    .label-container {
      > p {
        font-size: 14px;
        line-height: 1.2;
      }

      > strong {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.2;
      }

      > small {
        font-size: 10px;
        line-height: 1.2;
        color: #808080;
        margin-left: 1px;
      }
    }

    &:not(.link-item--vertical) {
      display: flex;
      padding: 8px;

      > .label-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 1 auto;
      }

      > * + * {
        margin-left: 8px;
      }
    }

    &.link-item--vertical {
      .label-container {
        padding: 8px;

        > p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
