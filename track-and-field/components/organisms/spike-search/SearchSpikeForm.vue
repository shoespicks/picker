<template>
  <v-card width="240" class="search-spike-form-container">
    <v-form @submit.prevent="search()">
      <label>
        種目
        <Select
          :value="getFormValue('events')"
          :items="events"
          item-text="label"
          placeholder="種目を選択"
          multiple
          @input="setFormValue('events', $event)"
        ></Select>
      </label>
      <label>
        キーワード
        <TextInput
          :value="getFormValue('keyword')"
          dense
          outlined
          @input="setFormValue('keyword', $event)"
        ></TextInput>
      </label>
      <label @click="$event.preventDefault()">
        ブランド
        <CheckBoxes
          :value="getFormValue('brands')"
          :items="brands"
          item-value="id"
          item-label="name"
          @input="setFormValue('brands', $event)"
        ></CheckBoxes>
      </label>
      <label @click="$event.preventDefault()">
        競技レベル
        <Select
          :value="getFormValue('level')"
          :items="levels"
          item-value="id"
          item-text="label"
          placeholder="指定なし"
          multiple
          @input="setFormValue('level', $event)"
        ></Select>
      </label>
      <label>
        発売年
        <Select
          :value="getFormValue('releaseYears')"
          :items="yearRange"
          multiple
          :height="40"
          item-value="id"
          item-text="label"
          placeholder="指定なし"
          @input="setFormValue('releaseYears', $event)"
        ></Select>
        <CheckBox
          :value="getFormValue('lastModelOnly')"
          label="最新モデルのみ"
          @input="setFormValue('lastModelOnly', $event)"
        ></CheckBox>
      </label>
      <label>
        対応環境
        <CheckBox
          :value="getFormValue('forAllWeatherTrack')"
          label="オールウェザー専用"
          @input="setFormValue('forAllWeatherTrack', $event)"
        ></CheckBox>
        <CheckBox
          :value="getFormValue('forDirtTrack')"
          label="土兼用"
          @input="setFormValue('forDirtTrack', $event)"
        ></CheckBox>
      </label>
      <label>
        ピン本数
        <span class="search-form-item-price-range-view"
          >{{ getFormValue('pinRange')[0] }}本 〜
          {{ getFormValue('pinRange')[1] }}本</span
        >
        <Slider
          :value="getFormValue('pinRange')"
          :max="15"
          :min="0"
          hide-details
          @input="setFormValue('pinRange', $event)"
        ></Slider>
      </label>

      <label>
        価格
        <span class="search-form-item-price-range-view"
          >¥ {{ getFormValue('priceRange')[0] }} 〜 ¥
          {{ getFormValue('priceRange')[1] }}</span
        >
        <Slider
          :value="getFormValue('priceRange')"
          :step="500"
          :max="50000"
          :min="0"
          hide-details
          @input="setFormValue('priceRange', $event)"
        ></Slider>
      </label>
      <label @click="$event.preventDefault()">
        靴紐タイプ
        <CheckBoxes
          :value="getFormValue('shoeLaceTypes')"
          :items="laceTypes"
          item-value="id"
          item-label="label"
          @input="setFormValue('shoeLaceTypes', $event)"
        ></CheckBoxes>
      </label>
      <label>
        色
        <ColorVariationsPicker
          :value="getFormValue('colors')"
          multiple
          :items="colors"
          @input="setFormValue('colors', $event)"
        ></ColorVariationsPicker>
      </label>
      <Button type="submit" full>検索</Button>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import CheckBox from '~/components/atoms/CheckBox.vue';
import Select from '~/components/atoms/Select.vue';
import Slider from '~/components/atoms/Slider.vue';
import TextInput from '~/components/atoms/TextInput.vue';
import ColorVariationsPicker from '~/components/molecules/ColorVariationsPicker.vue';
import CheckBoxes from '~/components/molecules/common/CheckBoxes.vue';
import { ISpikesSearchFormValue } from '~/store/model/searchSpikeInput';
import { athleteLevels } from '~/types/shoes/athleteLevel';
import { shoeBrands } from '~/types/shoes/shoeBrands';
import { shoeColors } from '~/types/shoes/shoeColors';
import { shoeEvents } from '~/types/shoes/shoeEvents';
import { shoeLaceTypes } from '~/types/shoes/shoeLaceTypes';

export default defineComponent({
  components: {
    Slider,
    CheckBox,
    ColorVariationsPicker,
    CheckBoxes,
    Select,
    TextInput,
    Button
  },
  props: {
    value: {
      type: Object as PropType<ISpikesSearchFormValue>,
      default: () => {}
    }
  },
  setup(props, context) {
    const todayYear = new Date().getFullYear();
    const yearRange: number[] = [...Array(3)].map((n, i) => todayYear - i);
    const searchFormValue = computed({
      get: () => props.value,
      set: (val: ISpikesSearchFormValue) => {
        context.emit('input', val);
      }
    });

    const getFormValue = computed(
      () => (key: keyof ISpikesSearchFormValue) => searchFormValue.value[key]
    );

    return {
      yearRange,
      events: Object.values(shoeEvents),
      brands: Object.values(shoeBrands),
      levels: Object.values(athleteLevels),
      colors: Object.values(shoeColors),
      laceTypes: Object.values(shoeLaceTypes),
      search: () => {
        context.emit('search');
      },
      searchFormValue,
      getFormValue,
      setFormValue: (key: keyof ISpikesSearchFormValue, val: any) => {
        const newFormValue = {
          ...searchFormValue.value
        };

        newFormValue[key] = val;
        searchFormValue.value = newFormValue;
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
