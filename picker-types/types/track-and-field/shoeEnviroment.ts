export type ShoeEnvirlomentCode = 'allweatherOnly' | 'soil';

export interface IShoeEnvirloment {
  readonly id: ShoeEnvirlomentCode;
  readonly label: string;
}

export const shoeEnviroments: { [key in ShoeEnvirlomentCode]: IShoeEnvirloment } = {
  allweatherOnly: {
    id: 'allweatherOnly',
    label: 'オールウェザー専用',
  },
  soil: {
    id: 'soil',
    label: '土兼用',
  },
} as const;
