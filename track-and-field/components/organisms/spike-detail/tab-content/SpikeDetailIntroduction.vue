<template>
  <div class="organisms-spike-detail-introduction-tab">
    <section class="spike-introduction-top-section">
      <Container :max-width="980">
        <NumberHeading text="基本性能" :number="1"></NumberHeading>
        <v-lazy
          v-model="showReccomend"
          :options="{
            threshold: 0.6
          }"
          width="100%"
          min-height="460"
          transition="fade-transition"
        >
          <div class="spike-introduction-top-section-content">
            <div class="chart-container">
              <RadarChart
                :data="[
                  spike.lightnessScore,
                  spike.widthScore,
                  spike.angleScore,
                  spike.gripScore,
                  spike.hardnessScore
                ]"
              ></RadarChart>
            </div>
            <section class="spike-introduction-recommended-for">
              <h3 :class="{ 'lazy-visible': showReccomend }">
                こんな人におすすめ！
              </h3>
              <div
                v-if="spike.recommendedFor"
                v-html="$md.render(spike.recommendedFor)"
              ></div>
            </section>
          </div>
        </v-lazy>
      </Container>
    </section>
    <section class="spike-introduction-key-features-section">
      <Container :max-width="980">
        <NumberHeading text="特徴" :number="2"></NumberHeading>
        <div>
          <v-lazy
            v-for="(keyFeature, index) in spike.keyFeatures"
            :key="keyFeature.id"
            :options="{
              threshold: 0.6
            }"
            v-bind="showKeyFeatures.values()[index]"
            width="100%"
            min-height="460"
            transition="fade-transition"
          >
            <section
              class="key-feature-item"
              :class="{
                'key-feature-item--multiple-image':
                  keyFeature.imageUrls && keyFeature.imageUrls.length > 1,
                'key-feature-item--no-image':
                  !keyFeature.imageUrls || !keyFeature.imageUrls.length
              }"
            >
              <h3 :class="{ 'lazy-visible': showKeyFeatures.values()[index] }">
                {{ keyFeature.title }}
              </h3>
              <div class="key-feature-item-content">
                <div v-if="keyFeature.imageUrls" class="image-container">
                  <v-img
                    v-for="imageUrl in keyFeature.imageUrls"
                    :key="imageUrl"
                    :src="imageUrl"
                    eager
                  />
                </div>
                <div class="discription-container">
                  <pre>{{ keyFeature.description }}</pre>
                </div>
              </div>
            </section>
          </v-lazy>
        </div>
      </Container>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import Container from '~/components/atoms/Container.vue';
import NumberHeading from '~/components/atoms/NumberHeading.vue';
import RadarChart from '~/components/molecules/RadarChart.vue';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { NumberHeading, Container, RadarChart },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    }
  },
  setup() {
    return {
      showReccomend: false,
      showKeyFeatures: ref<boolean[]>([...Array(5)].map(() => false))
    };
  }
});
</script>
<style lang="scss" scoped>
// この画面幅を超えたときレーダーチャートのセクションを2列配置に
$RadorTwoColBreakPoint: 1024px;

// この画面幅を超えたとき特徴セクションを2列配置に
$keyFeaturesTwoColBreakPoint: 1120px;

// この画面幅を超えたときサイドナビを表示
$sideNavBreakPoint: 768px;

.organisms-spike-detail-introduction-tab {
  > section {
    display: flex;
    padding: 48px 264px 72px 32px;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: $sideNavBreakPoint) {
      padding: 48px 32px 72px;
    }
  }
}

/**
 * 基本性能セクション
 */
.spike-introduction-top-section {
  .spike-introduction-top-section-content {
    display: flex;
    flex-wrap: wrap;

    > * {
      display: inline-flex;
      width: 100px;
      flex-direction: column;
      justify-content: center;
      flex: 1 1 auto;

      + * {
        margin-left: 64px;
      }
    }

    @media screen and (max-width: $RadorTwoColBreakPoint) {
      flex-direction: column;

      > * {
        width: 100%;

        + * {
          margin-left: 0;
        }
      }

      > .chart-container {
        padding: 0 48px;
      }
    }

    ::v-deep .spike-introduction-recommended-for {
      > h3 {
        transition: color 10s ease-in;

        &.lazy-visible {
          // color: red;
        }

        + * {
          margin-top: 16px;
        }
      }
      ul {
        padding: 0 24px 24px;
        list-style: square;

        > li {
          list-style: square;
        }
      }
    }
  }
}

/**
 * 特徴セクション
 */
.spike-introduction-key-features-section {
  .key-feature-item {
    width: 100%;
    padding: 32px 0;

    h3 {
      + * {
        margin-top: 16px;
      }

      transition: color 30s;

      &.lazy-visible {
        color: red;
      }
    }

    .key-feature-item-content {
      display: block;

      > * {
        width: 100%;

        &.image-container {
          display: flex;

          > * {
            flex: 1 1 auto;
            width: 1px;

            + * {
              margin-left: 16px;
            }
          }
        }

        + .discription-container {
          margin-top: 16px;
        }
      }
    }

    @media screen and (min-width: $keyFeaturesTwoColBreakPoint) {
      &:not(.key-feature-item--multiple-image, .key-feature-item--no-image) {
        .key-feature-item-content {
          display: flex;
          flex-wrap: wrap;

          > * {
            flex: 1;
            width: 1px;

            + .discription-container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-top: 0;
              margin-left: 36px;
            }

            &.image-container {
              display: block;

              > * {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
