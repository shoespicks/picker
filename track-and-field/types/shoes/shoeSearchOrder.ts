import { ISpikeShoesFields } from '~/types/generated/contentful';
import { ISelectItem } from '~/types/selectItem';

export type ShoeSearchOrderCode =
  | 'hard'
  | 'light'
  | 'gripPower'
  | 'flat'
  | 'warp'
  | 'wide'
  | 'narrow'
  | 'inexpensive'
  | 'expensive'
  | 'highscore';

export interface IShoeSearchOrder extends ISelectItem {
  id: ShoeSearchOrderCode;
  label: string;
  labelAlias: string;

  // ContentfulのContentModelのフィールド名
  fieldId: keyof ISpikeShoesFields;

  // フィールドの値の降順で検索する場合true
  isReverseSearch: boolean;
}

export const shoeSearchOrders: {
  [key in ShoeSearchOrderCode]: IShoeSearchOrder;
} = {
  hard: {
    id: 'hard',
    label: '反発力順',
    labelAlias: '反発の強い',
    fieldId: 'hardnessScore',
    isReverseSearch: true
  },
  light: {
    id: 'light',
    label: 'アシックス',
    labelAlias: 'とにかく軽い',
    fieldId: 'lightnessScore',
    isReverseSearch: true
  },
  gripPower: {
    id: 'gripPower',
    label: 'グリップ力順',
    labelAlias: 'グリップ力のある',
    fieldId: 'gripScore',
    isReverseSearch: true
  },
  flat: {
    id: 'flat',
    label: 'フラット順',
    labelAlias: 'フラットソールな',
    fieldId: 'angleScore',
    isReverseSearch: false
  },
  warp: {
    id: 'warp',
    label: '傾斜角度順',
    labelAlias: '反りが大きい',
    fieldId: 'angleScore',
    isReverseSearch: true
  },
  wide: {
    id: 'wide',
    label: '幅広順',
    labelAlias: '足幅が広い',
    fieldId: 'widthScore',
    isReverseSearch: true
  },
  narrow: {
    id: 'narrow',
    label: '幅狭順',
    labelAlias: '足幅が狭い',
    fieldId: 'widthScore',
    isReverseSearch: false
  },
  inexpensive: {
    id: 'inexpensive',
    label: '価格の安い順',
    labelAlias: '価格の安い',
    fieldId: 'price',
    isReverseSearch: false
  },
  expensive: {
    id: 'expensive',
    label: '価格の高い順',
    labelAlias: '価格の高い',
    fieldId: 'price',
    isReverseSearch: true
  },
  highscore: {
    id: 'highscore',
    label: 'おすすめ（人気）',
    labelAlias: '人気な（おすすめ）',
    fieldId: 'score',
    isReverseSearch: true
  }
};
