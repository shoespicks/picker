import { ISpikeShoesFields } from 'picker-types/generated/contentful';

export type ShoeBrandsCode = Exclude<ISpikeShoesFields['brand'], undefined>;

export interface IShoeBrand {
  readonly id: ShoeBrandsCode;
  readonly label: string;
  readonly labelEn: string;
}

export const shoeBrands: { [key in ShoeBrandsCode]: IShoeBrand } = {
  adidas: {
    id: 'adidas',
    label: 'アディダス',
    labelEn: 'Adidas',
  },
  asics: {
    id: 'asics',
    label: 'アシックス',
    labelEn: 'Asics',
  },
  mizuno: {
    id: 'mizuno',
    label: 'ミズノ',
    labelEn: 'Mizuno',
  },
  newBalance: {
    id: 'newBalance',
    label: 'ニューバランス',
    labelEn: 'New Balance',
  },
  nike: {
    id: 'nike',
    label: 'ナイキ',
    labelEn: 'Nike',
  },
} as const;
