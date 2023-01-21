import { GenderEnum, PrefectureEnum, User, UserProfile } from 'graphql/generated/codegen-client';

import { FormOptions, useFormBase } from 'shared/hooks/useFormBase';

export type ILabelItem<T extends string> = {
  readonly id: T;
  readonly label: string;
  readonly labelEn: string;
};
export const genderLabels: { [key in GenderEnum]: ILabelItem<GenderEnum> } = {
  MALE: {
    id: 'MALE',
    label: '男性',
    labelEn: 'Male',
  },
  FEMALE: {
    id: 'FEMALE',
    label: '女性',
    labelEn: 'Female',
  },
  OTHER: {
    id: 'OTHER',
    label: 'その他',
    labelEn: 'OTHER',
  },
};

export const prefectureLabels: { [key in PrefectureEnum]: ILabelItem<PrefectureEnum> } = {
  KANAGAWA: {
    id: 'KANAGAWA',
    label: '神奈川',
    labelEn: 'Kanagawa',
  },
  SAITAMA: {
    id: 'SAITAMA',
    label: '埼玉',
    labelEn: 'Saitama',
  },
  TOKYO: {
    id: 'TOKYO',
    label: '東京',
    labelEn: 'Tokyo',
  },
};

export type UserFormInputDef = Pick<User, 'name' | 'email' | 'image'> &
  Pick<UserProfile, 'introduction'> & {
    birthdate: string;
    gender: ILabelItem<GenderEnum>;
    prefecture: ILabelItem<PrefectureEnum>;
  };

export type UserFormHasOptionKey = 'gender' | 'prefecture';
const profileFormOptions: FormOptions<UserFormInputDef, UserFormHasOptionKey> = {
  gender: Object.values(genderLabels),
  prefecture: Object.values(prefectureLabels),
};

export const useProfileForm = (defaultValues: UserFormInputDef) => {
  return {
    ...useFormBase<UserFormInputDef, UserFormHasOptionKey>({ defaultValues }, profileFormOptions),
  };
};
