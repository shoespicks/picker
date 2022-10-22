<template>
  <v-form class="organisms-search-spike-form" @submit.prevent="search()">
    <v-row>
      <v-col :cols="vertical ? 12 : 6">
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
      </v-col>
      <v-col :cols="vertical ? 12 : 6">
        <label>
          キーワード
          <TextInput
            :value="searchFormValue.keyword"
            dense
            outlined
            @input="setFormValue('keyword', $event)"
          ></TextInput>
        </label>
      </v-col>
      <v-col :cols="vertical ? 12 : 6">
        <label @click="$event.preventDefault()">
          ブランド
          <Select
            :value="searchFormValue.brands"
            :items="brands"
            item-text="name"
            placeholder="指定なし"
            multiple
            @input="setFormValue('brands', $event)"
          ></Select>
        </label>
      </v-col>
      <v-col :cols="vertical ? 12 : 6">
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
      </v-col>
    </v-row>
    <v-row v-if="!vertical && !showDetailForm">
      <v-col cols="12" class='d-flex justify-center'>
        <Button color="text" plain @click='showDetailForm = true'
          ><v-icon left>fas fa-chevron-down</v-icon>絞り込み条件をすべて表示</Button
        >
      </v-col>
    </v-row>
    <v-row v-if="vertical || showDetailForm">
      <v-col :cols="vertical ? 12 : 6">
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
      </v-col>
      <v-col :cols="vertical ? 12 : 6">
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
      </v-col>
      <v-col :cols="vertical ? 12 : 6">
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
      </v-col>
      <v-col :cols="vertical ? 12 : 6">
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
      </v-col>
      <v-col :cols="vertical ? 12 : 6">
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
      </v-col>
      <v-col :cols="vertical ? 12 : 6">
        <label>
          色
          <ColorVariationsPicker
            :value="searchFormValue.colors"
            multiple
            :items="colors"
            @input="setFormValue('colors', $event)"
          ></ColorVariationsPicker>
        </label>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="showSearchButton" cols="12">
        <Button type="submit" full>検索</Button>
      </v-col>
    </v-row>
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
    },
    vertical: {
      type: Boolean,
      default: false
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
      showDetailForm: false,
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
