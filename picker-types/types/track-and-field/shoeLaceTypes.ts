import { ISpikeShoesFields } from 'generated/contentful';

export type ShoeLaceTypeCode = Exclude<ISpikeShoesFields['shoeLaceType'], undefined>[number];

export interface IShoeLaceType {
  readonly id: ShoeLaceTypeCode;
  readonly label: string;
}

export const shoeLaceTypes: { [key in ShoeLaceTypeCode]: IShoeLaceType } = {
  lace: {
    id: 'lace',
    label: '紐あり',
  },
  belt: {
    id: 'belt',
    label: 'ベルトあり',
  },
} as const;
