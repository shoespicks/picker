import { ISpikeShoesFields } from '~/types/generated/contentful';
import { ISelectItem } from '~/types/selectItem';

export type AthleteLevelCode = Exclude<ISpikeShoesFields['level'], undefined>

export interface IAthleteLevel extends ISelectItem {
  readonly id: AthleteLevelCode;
  readonly label: string;
}

export const athleteLevels: { [key in AthleteLevelCode]: IAthleteLevel } = {
  beginner: {
    id: 'beginner',
    label: '初級者'
  },
  intermediate: {
    id: 'intermediate',
    label: '中級者'
  },
  advanced: {
    id: 'advanced',
    label: '上級者'
  },
  professional: {
    id: 'professional',
    label: 'エキスパート'
  }
} as const;
