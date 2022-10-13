import { ISpikeShoesFields } from 'generated/contentful';

export type shoePinTypeCode = Exclude<ISpikeShoesFields['pinType'], undefined>[number];

export interface IShoePinType {
  readonly id: shoePinTypeCode;
  readonly label: string;
}

export const shoePinTypes: { [key in shoePinTypeCode]: IShoePinType } = {
  fixed: {
    id: 'fixed',
    label: '固定式',
  },
  removable: {
    id: 'removable',
    label: '交換式',
  },
} as const;
