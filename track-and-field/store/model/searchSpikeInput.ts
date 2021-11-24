import { AthleteLevelCode } from '~/types/shoes/athleteLevel';
import { ShoeBrandsCode } from '~/types/shoes/shoeBrands';
import { IShoeColor } from '~/types/shoes/shoeColors';
import { EventCategory } from '~/types/shoes/shoeEvents';
import { ShoeLaceTypeCode } from '~/types/shoes/shoeLaceTypes';

// 検索条件フォームにバインドするデータモデルのIF
export interface ISpikesSearchFormValue {
  eventCategory?: EventCategory;
  keyword?: string;
  brands?: ShoeBrandsCode[];
  level?: AthleteLevelCode[];
  priceRange?: [number, number];
  colors?: IShoeColor[];
  trackType?: {
    forAllWeatherTrack?: boolean;
    forDirtTrack?: boolean;
  };
  releaseYears?: number[];
  shoeLaceTypes?: ShoeLaceTypeCode[];
}

// APIに渡す検索条件のIF
export interface ISpikesSearchInput {
  // eslint-disable-next-line camelcase
  content_type: 'spikeShoes';
  query?: string;
  'fields.brand[in]'?: string;
  'fields.level[in]'?: string;
  'fields.colors[in]'?: string;
  'fields.allWeatherOnly'?: boolean;
  'fields.releaseYear[in]'?: string;
  'fields.price[lte]'?: number;
  'fields.price[gte]'?: number;
  'fields.shoeLaceType[all]'?: string;
}

function convertTrackTypeFormValue(
  trackType:
    | { forAllWeatherTrack?: boolean; forDirtTrack?: boolean }
    | undefined
) {
  if (!trackType) {
    return undefined;
  }

  if (trackType.forAllWeatherTrack) {
    return trackType.forDirtTrack ? undefined : true;
  }

  if (!trackType.forAllWeatherTrack) {
    return trackType.forDirtTrack ? false : undefined;
  }
}

// 検索条件フォームの値をAPIの検索条件に変換
export const createSearchInput = (formValue: ISpikesSearchFormValue) => {
  console.log(formValue?.priceRange);
  console.log(
    formValue?.priceRange &&
      formValue?.priceRange[1] < 50000 &&
      formValue?.priceRange[1]
  );

  const input: ISpikesSearchInput = {
    content_type: 'spikeShoes',
    // キーワード
    query: formValue?.keyword || undefined,

    // メーカー
    'fields.brand[in]': formValue?.brands?.join(',') || undefined,

    // 競技レベル
    'fields.level[in]': formValue?.level?.join(',') || undefined,

    // 対応環境
    'fields.allWeatherOnly': convertTrackTypeFormValue(formValue.trackType),

    // 発売年
    'fields.releaseYear[in]': formValue?.releaseYears?.join(',') || undefined,

    // 価格
    'fields.price[gte]':
      (formValue?.priceRange && formValue?.priceRange[0]) || undefined,
    'fields.price[lte]':
      (formValue?.priceRange &&
        formValue?.priceRange[1] < 50000 &&
        formValue?.priceRange[1]) ||
      undefined,

    // 靴紐タイプ
    'fields.shoeLaceType[all]':
      formValue?.shoeLaceTypes?.join(',') || undefined,

    // 色
    'fields.colors[in]':
      formValue?.colors?.map((c) => c.id).join(',') || undefined
  };
  return input;
};
