<template>
  <v-card
    class="molecules-spike-list-item"
    :ripple="false"
    @click="clickItem()"
  >
    <v-row>
      <v-col cols="6">
        <div class="molecules-spike-list-item-image-container">
          <v-card-title>
            <small class="spike-list-item-title-brand-name"
              >{{ shoeBrands[spike.brand].nameEn }} 　<span>{{
                spike.releaseYear
              }}</span>
            </small>
            <h3>{{ spike.name }}</h3>
            <p>{{ spike.nameEn }}</p>
          </v-card-title>
          <v-img :src="selectedColor.imageUrls[0]"> </v-img>
          <ColorVariationsPicker
            v-if="selectedColor"
            v-model="selectedColor"
            :items="spike.colorVariations"
          ></ColorVariationsPicker>
        </div>
      </v-col>
      <v-col cols="6">
        <RadarChart
          class="rader-chart"
          :data="[
            spike.lightnessScore,
            spike.widthScore,
            spike.angleScore,
            spike.gripScore,
            spike.hardnessScore
          ]"
        ></RadarChart>
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
                {
                  icon: 'fas fa-yen-sign',
                  text: spike.price.toLocaleString()
                },
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
      </v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import IconText from '~/components/atoms/IconText.vue';
import ColorVariationsPicker from '~/components/molecules/ColorVariationsPicker.vue';
import RadarChart from '~/components/molecules/RadarChart.vue';
import { ISpikeModel } from '~/store/model/spike';
import { shoeBrands } from '~/types/shoes/shoeBrands';

export default defineComponent({
  components: { RadarChart, ColorVariationsPicker, IconText },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    }
  },
  setup(props, context) {
    return {
      selectedColor: props.spike?.colorVariations
        ? ref(props.spike?.colorVariations[0])
        : null,
      crousel: ref(0),
      shoeBrands,
      clickItem: () => {
        context.emit('click', props.spike);
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
    transform: scale(1.04);
  }

  .molecules-spike-list-item-image-container {
    padding: 16px;

    > * + * {
      margin-top: 16px;
    }
  }

  .v-card__title {
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
    flex-wrap: wrap;
    align-items: center;
    margin-left: -4px;
    margin-top: -4px;

    > li {
      display: inline-flex;
      margin: 4px;
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

  .rader-chart {
    margin-top: -24px;
    margin-right: 16px;
    margin-left: -8px;
  }
}
</style>
