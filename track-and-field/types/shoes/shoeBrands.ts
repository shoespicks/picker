import { ISpikeShoesFields } from '~/types/generated/contentful';
import { ISelectItem } from '~/types/selectItem';

export type ShoeBrandsCode = Exclude<ISpikeShoesFields['brand'], undefined>;

export interface IShoeBrand extends ISelectItem {
  readonly id: ShoeBrandsCode;
  readonly name: string;
  readonly nameEn: string;
}

export const shoeBrands: { [key in ShoeBrandsCode]: IShoeBrand } = {
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
} as const;

