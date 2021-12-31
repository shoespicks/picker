<template>
  <section class="organisms-spike-detail-top-section">
    <h1>
      <span>{{ spike.brand }} {{ spike.nameEn }} </span>
      <small> {{ spike.name }}</small>
      <small v-if="spike.releaseYear">{{ spike.releaseYear }}年モデル</small>
    </h1>
    <v-row class="spike-top-content">
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
        class="spike-top-content-image"
      >
        <div class="spike-top-content-image-carousel-container">
          <v-carousel v-if="spike.colorVariations" height="100%">
            <v-carousel-item
              v-for="(imageUrl, index) in selectedColor.imageUrls"
              :key="index"
            >
              <v-img :src="imageUrl" aspect-ratio="1" contain></v-img>
            </v-carousel-item>
          </v-carousel>
        </div>
        <ColorVariationsPicker
          v-if="selectedColor"
          v-model="selectedColor"
          :items="spike.colorVariations"
          large
          class="color-variations-picker"
        ></ColorVariationsPicker>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
        class="spike-top-content-description"
      >
        <section class="spike-top-content-description-strength">
          <h3>
            {{ spike.name }}
            <span v-if="spike.releaseYear">{{ spike.releaseYear }}年モデル</span
            >の特徴
          </h3>
          <ul v-if="spike.strength">
            <li v-for="strength in spike.strength" :key="strength.label">
              <span>
                <v-icon left>{{ strength.icon }}</v-icon>
              </span>
              <div>
                <p v-if="strength.label">{{ strength.label }}</p>
                <small v-if="strength.description">{{
                  strength.description
                }}</small>
              </div>
            </li>
          </ul>
        </section>
        <ul class="spike-top-content-description-buy-actions">
          <li v-if="spike.amazonUrl">
            <Button
              color="grey darken-2"
              dark
              @click="openNewTabByUrl(spike.amazonUrl)"
            >
              <v-icon left>fab fa-amazon</v-icon>Amazonで買う</Button
            >
          </li>
          <li v-if="spike.rakutenUrl">
            <Button
              color="grey darken-2"
              dark
              @click="openNewTabByUrl(spike.rakutenUrl)"
              >楽天で買う</Button
            >
          </li>
          <li v-if="spike.brandPageUrl">
            <Button
              color="grey darken-2"
              dark
              @click="openNewTabByUrl(spike.brandPageUrl)"
              >公式サイトで買う</Button
            >
          </li>
        </ul>
      </v-col>
    </v-row>
    <section v-if="spike.newModels" class="new-models">
      <h3>このスパイクには新モデルがあります</h3>
      <SimpleSpikeList :spikes="spike.newModels"></SimpleSpikeList>
    </section>
  </section>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref
} from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import ColorVariationsPicker from '~/components/molecules/ColorVariationsPicker.vue';
import SimpleSpikeList from '~/components/molecules/spikeList/SimpleSpikeList.vue';
import { ISpikeModel } from '~/store/model/spike';
import { shoeBrands } from '~/types/shoes/shoeBrands';
import { openNewTabByUrl } from '~/utils/navigateUtils';

export default defineComponent({
  components: { SimpleSpikeList, Button, ColorVariationsPicker },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    },
    isFavorite: {
      type: Number,
      default: null
    },
    have: {
      type: Number,
      default: null
    },
    reviewed: {
      type: Number,
      default: null
    }
  },
  setup(props, context) {
    return {
      shoeBrands,
      selectedColor: props.spike?.colorVariations
        ? ref(props.spike?.colorVariations[0])
        : null,
      isFavoriteValue: computed({
        get: () => props.isFavorite,
        set: (val: number) => {
          context.emit('update:isFavorite', val);
        }
      }),
      haveValue: computed({
        get: () => props.have,
        set: (val: number) => {
          context.emit('update:have', val);
        }
      }),
      reviewedValue: computed({
        get: () => props.reviewed,
        set: (val: number) => {
          context.emit('update:reviewed', val);
        }
      }),
      openNewTabByUrl: (url: string) => {
        openNewTabByUrl(url);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-spike-detail-top-section {
  h1 {
    display: flex;
    flex-direction: column;
    font-size: 40px;

    > * {
      display: inline-flex;
    }

    > span {
      font-family: 'marsek', 'Noto Sans JP', 'Roboto', sans-serif;
    }

    > small {
      margin-top: -16px;
      font-size: 24px;

      + small {
        font-size: 18px;
        margin-top: -4px;
      }
    }
  }

  .spike-top-actions {
    display: flex;
    margin-left: -16px;
    align-items: center;
    flex-wrap: wrap;

    > * {
      display: inline-flex;
      align-items: center;
      margin-top: 8px;
      margin-left: 16px;
    }

    > .spike-rating {
      font-size: 18px;

      * + * {
        margin-left: 8px;
      }
    }
  }

  .spike-top-actions-buttons {
    > li {
      &:first-of-type {
        + li {
          margin-left: 16px;
        }
      }

      + li {
        margin-left: 4px;
      }
    }
  }

  * + .spike-top-content {
    margin-top: 24px;
  }

  .spike-top-content {
    .spike-top-content-image-carousel-container {
      position: relative;
      width: 100%;
      padding-bottom: 100%;

      > .v-carousel {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }

    .color-variations-picker {
      margin: 16px 0;
    }

    .spike-top-content-description-strength {
      h3 {
        + * {
          margin-top: 16px;
        }
      }

      > ul {
        padding-left: 16px;

        > li {
          display: flex;

          > span {
            display: inline-flex;
            width: 30px;
            height: 48px;
            padding-top: 4px;
            align-items: flex-start;
            justify-content: center;

            + * {
              margin-left: 16px;
            }
          }

          > div {
            > p {
              font-weight: 500;
            }

            > small {
              color: gray;
            }
          }

          + li {
            margin-top: 16px;
          }
        }
      }

      + * {
        margin-top: 32px;
      }
    }

    .spike-top-content-description-buy-actions {
      display: flex;
      align-items: center;

      > li {
        + li {
          margin-left: 8px;
        }
      }
    }
  }

  .new-models {
    margin-top: 16px;

    > ul {
      display: flex;
      padding: 16px;
      overflow-x: auto;

      > li {
        + li {
          margin-left: 16px;
        }
      }
    }
  }

  .v-btn-toggle--dense > .v-btn.v-btn {
    padding: 0 12px;
  }
}
</style>
