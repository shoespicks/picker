<template>
  <v-card
    class="molecules-spike-list-item"
    :ripple="false"
    @click="clickItem()"
  >
    <v-img
      :src="hoverImg ? selectedColor.imageUrls[1] : selectedColor.imageUrls[0]"
      @mouseover="changeHoverImg(true)"
      @mouseleave="changeHoverImg(false)"
    >
    </v-img>
    <section>
      <ColorVariationsPicker
        v-if="selectedColor"
        v-model="selectedColor"
        :items="spike.colorVariations"
      ></ColorVariationsPicker>
      <v-card-title>
        <small class="spike-list-item-title-brand-name">{{
          shoeBrands[spike.brand].nameEn
        }}</small>
        <h3>{{ spike.name }}</h3>
        <p>{{ spike.nameEn }}</p>
        <small>{{ spike.releaseYear }}</small>
      </v-card-title>
      <ul class="spike-list-item-events">
        <li
          v-for="event in spike.events"
          :key="event"
          class="spike-list-item-events-chip"
        >
          <v-chip
            outlined
            color="#383838"
            x-small
            disabled
            style="padding: 0 8px; opacity: 1"
            >{{ event }}</v-chip
          >
        </li>
      </ul>
      <div class="spike-list-item-sub-info">
        <ul class="sub-info-list">
          <li
            v-for="item in [
              { icon: 'fas fa-yen-sign', text: spike.price.toLocaleString() },
              { icon: 'fas fa-weight', text: spike.weight + 'g' },
              {
                icon: 'fas fa-umbrella',
                text: spike.allWeatherOnly ? '全天候専用' : '土兼用'
              }
            ]"
            :key="item.icon"
          >
            <IconText :icon="item.icon" :size="11">{{ item.text }}</IconText>
          </li>
        </ul>
      </div>
    </section>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import IconText from '~/components/atoms/IconText.vue';
import ColorVariationsPicker from '~/components/molecules/ColorVariationsPicker.vue';
import { ISpikeModel } from '~/store/model/spike';
import { shoeBrands } from '~/types/shoes/shoeBrands';

export default defineComponent({
  components: { ColorVariationsPicker, IconText },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    }
  },
  setup(props, context) {
    const hoverImg = ref(false);

    return {
      hoverImg,
      selectedColor: props.spike?.colorVariations
        ? ref(props.spike?.colorVariations[0])
        : null,
      crousel: ref(0),
      shoeBrands,
      clickItem: () => {
        context.emit('click', props.spike);
      },
      changeHoverImg: (hover: boolean) => {
        hoverImg.value = hover;
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.molecules-spike-list-item {
  padding: 0;
  cursor: pointer;
  transition: transform 200ms ease;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }

  &:focus:before {
    opacity: 0;
  }

  > section {
    padding: 8px 16px;

    * + .v-card__title {
      margin-top: 8px;
    }

    ::v-deep .v-card__title {
      padding: 0;
      flex-direction: column;
      align-items: flex-start;

      h3 {
        display: block;
        font-size: 16px;
        line-height: 1.2;

        + p {
          margin-top: 4px;
          font-size: 12px;
        }
      }

      small {
        font-size: 10px;

        &.spike-list-item-title-brand-name {
          padding-left: 2px;
        }
      }

      p,
      small {
        margin: 0;
        font-family: 'marsek', 'Noto Sans JP', 'Roboto', sans-serif;
        line-height: 1.2;
      }

      + * {
        margin-top: 8px;
      }
    }

    ul.spike-list-item-events {
      display: flex;
      margin-bottom: 2px;
      flex-wrap: wrap;
      align-items: center;

      > li {
        display: inline-flex;

        + li {
          margin-left: 4px;
        }
      }
    }

    .spike-list-item-sub-info {
      ul.sub-info-list {
        display: flex;
        padding-left: 2px;
        flex-wrap: wrap;
        align-items: center;

        > li {
          display: inline-flex;

          + li {
            margin-left: 8px;
          }

          .atoms-icon-text > span {
            margin-top: -0.5px;
          }
        }
      }
    }
  }
}
</style>
