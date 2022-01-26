<template>
  <v-card
    class="molecules-spike-list-item"
    :ripple="false"
    @click="clickItem()"
  >
    <v-row>
      <v-col cols="5">
        <div class="main-container d-flex flex-column">
          <v-card-title class="flex-shrink-0">
            <small class="spike-list-item-title-brand-name"
              >{{ shoeBrands[spike.brand].nameEn }}
              <span>{{ spike.releaseYear }}</span>
            </small>
            <h3>{{ spike.name }}</h3>
            <p>{{ spike.nameEn }}</p>
          </v-card-title>
          <div class="main-image-container flex-grow-1">
            <div class="image-wrapper d-flex flex-column">
              <v-img
                :src="selectedColor.imageUrls[0]"
                class="flex-grow-1"
                aspect-ratio="4/3"
                contain
              ></v-img>
              <ColorVariationsPicker
                v-if="selectedColor"
                v-model="selectedColor"
                class="flex-shrink-0"
                :items="spike.colorVariations"
              ></ColorVariationsPicker>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="7">
        <div class="data-view-container d-flex flex-column">
          <div class="data-view-strength flex-shrink-0">
            <!--            <div class="strength-wrapper">-->
            <IconText
              v-if="spike.strength[0]"
              :icon="spike.strength[0].icon"
              :label="spike.strength[0].label"
              :description="spike.strength[0].description"
              :icon-size="24"
            ></IconText>
            <!--            </div>-->
          </div>
          <div class="data-view-rader flex-grow-1">
            <RadarChart
              :data="[
                spike.lightnessScore,
                spike.widthScore,
                spike.angleScore,
                spike.gripScore,
                spike.hardnessScore
              ]"
              small
            ></RadarChart>
          </div>
          <div class="data-view-info flex-shrink-0 mt-4">
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
                <IconText :icon="item.icon" :label-size="11">{{
                  item.text
                }}</IconText>
              </li>
            </ul>
          </div>
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
    transform: scale(1.01);
  }

  .main-container {
    height: 100%;
    padding: 0.5rem 0 0.5rem 1rem;

    > * {
      + * {
        margin-top: 16px;
      }
    }

    > .main-image-container {
      position: relative;

      > .image-wrapper {
        position: absolute;
        height: 100%;
        width: 100%;
      }
    }
  }

  .data-view-container {
    height: 100%;
    padding: 0.5rem 1rem 0.5rem 0;

    > .data-view-strength {
      position: relative;
      height: 68px;

      > .strength-wrapper {
        position: absolute;
        width: 100%;
      }
    }

    > .data-view-rader {
      display: flex;
      align-items: center;
      justify-content: center;
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
</style>
