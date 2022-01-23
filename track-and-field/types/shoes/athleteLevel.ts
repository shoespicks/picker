// ISpikeShoesFieldsのbrandsからコピー
import { ISelectItem } from '~/types/selectItem';

export type AthleteLevelCode =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'professional';

export interface IAthleteLevel extends ISelectItem {
  id: AthleteLevelCode;
  label: string;
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
};
