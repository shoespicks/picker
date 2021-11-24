import { ISelectItem } from '~/types/selectItem';

// ISpikeShoesFieldsのpinTypeからコピー
export type shoePinTypeCode = 'fixed' | 'removable';

export interface IShoePinType extends ISelectItem {
  id: shoePinTypeCode;
  label: string;
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
};
