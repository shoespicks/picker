import { ISelectItem } from '~/types/selectItem';

// ISpikeShoesFieldsのbrandsからコピー
export type ShoeLaceTypeCode = 'lace' | 'belt';

export interface IShoeLaceType extends ISelectItem {
  id: ShoeLaceTypeCode;
  label: string;
}

export const shoeLaceTypes: { [key in ShoeLaceTypeCode]: IShoeLaceType } = {
  lace: {
    id: 'lace',
    label: '紐あり'
  },
  belt: {
    id: 'belt',
    label: 'ベルトあり'
  }
};
