<template>
  <v-card width="240" class="search-spike-form-container">
    <v-form @submit.prevent="search()">
      <label>
        種目
        <SearchLauncher>
          <template #activator="{ on, attrs }">
            <Button
              v-if="searchFormValue.eventOrEventCategory"
              class="search-spike-form-evens-input"
              color="#383838"
              outlined
              plain
              v-bind="attrs"
              v-on="on"
              >{{
                searchFormValue.eventOrEventCategory.label || '種目で絞り込み'
              }}<v-icon right>mdi mdi-menu-down</v-icon></Button
            >
          </template>
        </SearchLauncher>
      </label>
      <label>
        キーワード
        <TextInput v-model="searchFormValue.keyword" dense outlined></TextInput>
      </label>
      <label @click="$event.preventDefault()">
        ブランド
        <CheckBoxes
          v-model="searchFormValue.brands"
          :items="brands"
          item-value="id"
          item-label="name"
        ></CheckBoxes>
      </label>
      <label @click="$event.preventDefault()">
        競技レベル
        <CheckBoxes
          v-model="searchFormValue.level"
          :items="levels"
          item-value="id"
          item-label="label"
        ></CheckBoxes>
      </label>
      <label>
        発売年
        <Select
          v-model="searchFormValue.releaseYears"
          :items="[2020, 2021]"
          multiple
          :height="40"
          item-value="id"
          item-text="label"
          placeholder="指定なし"
        ></Select>
      </label>
      <label>
        対応環境
        <CheckBox
          v-model="searchFormValue.trackType.forAllWeatherTrack"
          label="オールウェザー専用"
        ></CheckBox>
        <CheckBox
          v-model="searchFormValue.trackType.forDirtTrack"
          label="土兼用"
        ></CheckBox>
      </label>
      <label>
        価格
        <span class="search-form-item-price-range-view"
          >¥ {{ searchFormValue.priceRange[0] }} 〜 ¥
          {{ searchFormValue.priceRange[1] }}</span
        >
        <Slider
          v-model="searchFormValue.priceRange"
          :step="500"
          :max="50000"
          :min="0"
          hide-details
        ></Slider>
      </label>
      <label @click="$event.preventDefault()">
        靴紐タイプ
        <CheckBoxes
          v-model="searchFormValue.shoeLaceTypes"
          :items="laceTypes"
          item-value="id"
          item-label="label"
        ></CheckBoxes>
      </label>
      <label>
        色
        <ColorVariationsPicker
          v-model="searchFormValue.colors"
          multiple
          :items="colors"
        ></ColorVariationsPicker>
      </label>
      <Button type="submit" full>検索</Button>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import { cloneDeep } from 'lodash';
import Button from '~/components/atoms/Button.vue';
import CheckBox from '~/components/atoms/CheckBox.vue';
import Select from '~/components/atoms/Select.vue';
import Slider from '~/components/atoms/Slider.vue';
import TextInput from '~/components/atoms/TextInput.vue';
import ColorVariationsPicker from '~/components/molecules/ColorVariationsPicker.vue';
import CheckBoxes from '~/components/molecules/common/CheckBoxes.vue';
import SearchLauncher from '~/components/organisms/SearchLauncher.vue';
import { ISpikesSearchFormValue } from '~/store/model/searchSpikeInput';
import { athleteLevels } from '~/types/shoes/athleteLevel';
import { shoeBrands } from '~/types/shoes/shoeBrands';
import { shoeColors } from '~/types/shoes/shoeColors';
import { shoeLaceTypes } from '~/types/shoes/shoeLaceTypes';

export default defineComponent({
  components: {
    Slider,
    CheckBox,
    ColorVariationsPicker,
    CheckBoxes,
    Select,
    TextInput,
    Button,
    SearchLauncher
  },
  props: {
    defaultValue: {
      type: Object as PropType<ISpikesSearchFormValue>,
      required: true
    }
  },
  setup(props, context) {
    const searchFormValue = ref<ISpikesSearchFormValue>(cloneDeep(props.defaultValue));

    return {
      searchFormValue,
      brands: Object.values(shoeBrands),
      levels: Object.values(athleteLevels),
      colors: Object.values(shoeColors),
      laceTypes: Object.values(shoeLaceTypes),
      search: () => {
        context.emit('search', searchFormValue.value);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.search-spike-form-container {
  padding: 16px;

  ::v-deep .v-card__title {
    padding: 0 0 0 2px;
    font-size: 16px;
    font-weight: 700;
  }

  .molecules-search-launcher {
    .search-spike-form-evens-input {
      width: 100%;
      justify-content: space-between;
    }
  }

  .v-form {
    > label {
      display: block;

      + label {
        margin-top: 16px;
      }

      + .v-btn {
        margin-top: 16px;
        width: 100%;
      }

      .molecules-color-variations-picker {
        margin-top: 8px;
      }

      .search-form-item-price-range-view {
        display: block;
      }
    }
  }
}
</style>
