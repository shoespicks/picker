import { IAthleteLevel } from '~/types/shoes/athleteLevel';
import { IShoeBrand, ShoeBrandsCode } from '~/types/shoes/shoeBrands';
import { IShoeColor } from '~/types/shoes/shoeColors';
import { IEventItem } from '~/types/shoes/shoeEvents';
import { ShoeLaceTypeCode } from '~/types/shoes/shoeLaceTypes';
import {
  IShoeSearchOrder,
  shoeSearchOrders
} from '~/types/shoes/shoeSearchOrder';

export const DEFAULT_SPIKES_SEARCH_LIMIT = 200;

// 検索条件フォームにバインドするデータモデルのIF
export interface ISpikesSearchFormInputs {
  events?: IEventItem[];
  keyword?: string;
  brands?: IShoeBrand[];
  level?: IAthleteLevel[];
  priceRange?: [number, number];
  pinRange?: [number, number];
  colors?: IShoeColor[];
  forAllWeatherTrack?: boolean;
  forDirtTrack?: boolean;
  releaseYears?: number[];
  lastModelOnly?: boolean;
  shoeLaceTypes?: ShoeLaceTypeCode[];
  order?: IShoeSearchOrder;
  limit?: number;
}

export function createDefaultSearchFormValue(): ISpikesSearchFormInputs {
  return {
    events: [],
    keyword: undefined,
    brands: [],
    level: [],
    priceRange: [0, 50000],
    pinRange: [0, 15],
    forAllWeatherTrack: false,
    forDirtTrack: false,
    releaseYears: [],
    lastModelOnly: true,
    shoeLaceTypes: [],
    colors: [],
    order: shoeSearchOrders.highscore
  };
}

// APIに渡す検索条件のIF
export interface ISpikesSearchParams {
  // eslint-disable-next-line camelcase
  content_type: 'spikeShoes';
  query?: string;
  'fields.events[in]'?: string;
  'fields.brand[in]'?: string;
  'fields.level[in]'?: string;
  'fields.colors[in]'?: string;
  'fields.allWeatherOnly'?: boolean;
  'fields.pinNumber[gte]'?: number;
  'fields.pinNumber[lte]'?: number;
  'fields.releaseYear[in]'?: string;
  'fields.newModels[exists]'?: boolean;
  'fields.price[gte]'?: number;
  'fields.price[lte]'?: number;
  'fields.shoeLaceType[all]'?: string;
  limit?: number;
  order?: string;
}

// 検索条件フォームの値をAPIの検索条件に変換
export const createSearchParams = (
  formValue: ISpikesSearchFormInputs,
  overRideParams: Partial<ISpikesSearchParams> = {}
) => {
  const input: ISpikesSearchParams = {
    content_type: 'spikeShoes',
    // キーワード
    query: formValue?.keyword || undefined,

    // 種目
    'fields.events[in]':
      formValue?.events?.flatMap((e) => e.eventCodes).join(',') || undefined,

    // メーカー
    'fields.brand[in]':
      formValue?.brands?.map((b) => b.id)?.join(',') || undefined,

    // 競技レベル
    'fields.level[in]':
      formValue?.level?.map((l) => l.id)?.join(',') || undefined,

    // 対応環境
    'fields.allWeatherOnly': convertTrackTypeInput(
      formValue.forAllWeatherTrack,
      formValue.forDirtTrack
    ),

    // ピン本数
    'fields.pinNumber[gte]':
      (formValue?.pinRange && formValue?.pinRange[0]) || undefined,
    'fields.pinNumber[lte]':
      (formValue?.pinRange && formValue?.pinRange[1]) || undefined,

    // 発売年
    'fields.releaseYear[in]': formValue?.releaseYears?.join(',') || undefined,

    // 最新モデルのみ
    'fields.newModels[exists]': formValue?.lastModelOnly ? false : undefined,

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
      formValue?.colors?.map((c) => c.id).join(',') || undefined,

    // 並び順
    order: convertOrderInput(formValue?.order),

    // 取得上限数
    limit: formValue?.limit || DEFAULT_SPIKES_SEARCH_LIMIT,

    ...overRideParams
  };
  return input;
};

function convertTrackTypeInput(
  forAllWeatherTrack?: boolean,
  forDirtTrack?: boolean
) {
  if (forAllWeatherTrack) {
    return forDirtTrack ? undefined : true;
  }

  return forDirtTrack ? false : undefined;
}

/**
 * 並び順を変換する
 * スコアの高い順ソートは常に適用する
 */
function convertOrderInput(order?: IShoeSearchOrder): string | undefined {
  let orderInput = '';

  if (order && order.id !== shoeSearchOrders.highscore.id) {
    orderInput =
      (order.isReverseSearch ? '-' : '') + `fields.${order.fieldId},`;
  }

  return orderInput + `-fields.${shoeSearchOrders.highscore.fieldId}`;
}
