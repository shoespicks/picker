<template>
  <v-form class="organisms-search-spike-form" @submit.prevent="search()">
    <label>
      種目
      <Select
        :value="searchFormValue.events"
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
        :value="searchFormValue.keyword"
        dense
        outlined
        @input="setFormValue('keyword', $event)"
      ></TextInput>
    </label>
    <label @click="$event.preventDefault()">
      ブランド
      <CheckBoxes
        :value="searchFormValue.brands"
        :items="brands"
        item-value="id"
        item-label="name"
        @input="setFormValue('brands', $event)"
      ></CheckBoxes>
    </label>
    <label @click="$event.preventDefault()">
      競技レベル
      <Select
        :value="searchFormValue.level"
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
        :value="searchFormValue.releaseYears"
        :items="yearRange"
        multiple
        :height="40"
        item-value="id"
        item-text="label"
        placeholder="指定なし"
        @input="setFormValue('releaseYears', $event)"
      ></Select>
      <CheckBox
        :value="searchFormValue.lastModelOnly"
        label="最新モデルのみ"
        @input="setFormValue('lastModelOnly', $event)"
      ></CheckBox>
    </label>
    <label>
      対応環境
      <CheckBox
        :value="searchFormValue.forAllWeatherTrack"
        label="オールウェザー専用"
        @input="setFormValue('forAllWeatherTrack', $event)"
      ></CheckBox>
      <CheckBox
        :value="searchFormValue.forDirtTrack"
        label="土兼用"
        @input="setFormValue('forDirtTrack', $event)"
      ></CheckBox>
    </label>
    <label>
      ピン本数
      <span class="search-form-item-price-range-view"
        >{{ searchFormValue.pinRange[0] }}本 〜
        {{ searchFormValue.pinRange[1] }}本</span
      >
      <Slider
        :value="searchFormValue.pinRange"
        :max="15"
        :min="0"
        hide-details
        @input="setFormValue('pinRange', $event)"
      ></Slider>
    </label>

    <label>
      価格
      <span class="search-form-item-price-range-view"
        >¥ {{ searchFormValue.priceRange[0] }} 〜 ¥
        {{ searchFormValue.priceRange[1] }}</span
      >
      <Slider
        :value="searchFormValue.priceRange"
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
        :value="searchFormValue.shoeLaceTypes"
        :items="laceTypes"
        item-value="id"
        item-label="label"
        @input="setFormValue('shoeLaceTypes', $event)"
      ></CheckBoxes>
    </label>
    <label>
      色
      <ColorVariationsPicker
        :value="searchFormValue.colors"
        multiple
        :items="colors"
        @input="setFormValue('colors', $event)"
      ></ColorVariationsPicker>
    </label>
    <Button v-if="showSearchButton" type="submit" full>検索</Button>
  </v-form>
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
import { ISpikesSearchFormInputs } from '~/store/model/searchSpikeInput';
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
      type: Object as PropType<ISpikesSearchFormInputs>,
      default: () => {}
    },
    showSearchButton: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const todayYear = new Date().getFullYear();
    const yearRange: number[] = [...Array(3)].map((_, i) => todayYear - i);
    const searchFormValue = computed<ISpikesSearchFormInputs>({
      get: () => props.value,
      set: (val: ISpikesSearchFormInputs) => {
        context.emit('input', val);
      }
    });

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
      setFormValue: (key: keyof ISpikesSearchFormInputs, val: any) => {
        searchFormValue.value = {
          ...searchFormValue.value,
          [key]: val
        };
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.molecules-search-launcher {
  .search-spike-form-evens-input {
    width: 100%;
    justify-content: space-between;
  }
}

.organisms-search-spike-form {
  > label {
    display: block;

    + label {
      margin-top: 16px;
    }

    + .v-btn {
      margin-top: 16px;
    }

    .molecules-color-variations-picker {
      margin-top: 8px;
    }

    .search-form-item-price-range-view {
      display: block;
    }
  }
}
</style>
