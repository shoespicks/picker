import { ISpikeShoesFields } from '~/types/generated/contentful';
import { ISelectItem } from '~/types/selectItem';

export type shoePinTypeCode =Exclude<ISpikeShoesFields['pinType'], undefined>[number];

export interface IShoePinType extends ISelectItem {
  readonly id: shoePinTypeCode;
  readonly label: string;
}

export const shoePinType: { [key in shoePinTypeCode]: IShoePinType } = {
  fixed: {
    id: 'fixed',
    label: '固定式'
  },
  removable: {
    id: 'removable',
    label: '交換式'
  }
} as const;
