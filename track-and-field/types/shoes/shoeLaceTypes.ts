import { ISpikeShoesFields } from '~/types/generated/contentful';
import { ISelectItem } from '~/types/selectItem';

export type ShoeLaceTypeCode = Exclude<ISpikeShoesFields['shoeLaceType'], undefined>[number];

export interface IShoeLaceType extends ISelectItem {
  readonly id: ShoeLaceTypeCode;
  readonly label: string;
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
} as const;
