import { ISelectItem } from '~/types/selectItem';

// ISpikeShoesFieldsのbrandsからコピー
export type ShoeBrandsCode =
  | 'adidas'
  | 'asics'
  | 'mizuno'
  | 'newBalance'
  | 'nike';

export interface IShoeBrandName extends ISelectItem {
  id: ShoeBrandsCode;
  name: string;
  nameEn: string;
}

export const shoeBrands: { [key in ShoeBrandsCode]: IShoeBrandName } = {
  adidas: {
    id: 'adidas',
    name: 'アディダス',
    nameEn: 'Adidas'
  },
  asics: {
    id: 'asics',
    name: 'アシックス',
    nameEn: 'Asics'
  },
  mizuno: {
    id: 'mizuno',
    name: 'ミズノ',
    nameEn: 'Mizuno'
  },
  newBalance: {
    id: 'newBalance',
    name: 'ニューバランス',
    nameEn: 'New Balance'
  },
  nike: {
    id: 'nike',
    name: 'ナイキ',
    nameEn: 'Nike'
  }
};
