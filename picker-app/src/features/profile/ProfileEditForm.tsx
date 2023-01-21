import React, { type FC, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { isString } from 'lodash-es';
import { Button } from 'components/atoms/Button';
import { Form } from 'components/atoms/Form';
import { InputControl } from 'components/atoms/input/Input';
import { Label } from 'components/atoms/Label';
import { SelectControl } from 'components/atoms/Select';
import { Spacer } from 'components/atoms/Spacer';
import { AUTH_LOGIN_URL } from 'features/auth/constants/routing';
import {
  genderLabels,
  ILabelItem,
  prefectureLabels,
  useProfileForm,
  UserFormInputDef,
} from 'features/profile/hooks/useProfileForm';
import { PrefectureEnum, UserProfileFragment, useUpdateUserProfileMutation } from 'graphql/generated/codegen-client';
import { $spacing } from 'shared/constants/styles/spacing';
import { createDateStringForInputElement } from 'shared/utils/dateUtils';

type Props = {
  user: UserProfileFragment;
};

export const ProfileEditForm: FC<Props> = ({ user }) => {
  const { formOptions, control, handleSubmit } = useProfileForm({
    name: user.name,
    email: user.email,
    image: user.image,
    birthdate:
      (user.profile?.birthdate && createDateStringForInputElement(new Date(user.profile?.birthdate))) ?? '2000-01-01',
    introduction: user.profile?.introduction || '',
    gender: user.profile?.gender ? genderLabels[user.profile?.gender] : genderLabels.MALE,
    prefecture: user.profile?.prefecture ? prefectureLabels[user.profile?.prefecture] : prefectureLabels.TOKYO,
  });

  const { query, push } = useRouter();
  const { mutate } = useUpdateUserProfileMutation({
    onSuccess: async () => {
      push(isString(query?.callbackUrl) ? query?.callbackUrl : `/profile/${user.id}`).then();
    },
    onError: async error => {
      // TODO エラーコード必要そうなら決める
      if (error?.toString()?.indexOf('Unique constraint failed on the constraint: `User_email_key`') != -1) {
        // TODO Utilに移す
        push({
          pathname: AUTH_LOGIN_URL,
          query: { error: 'OAuthAccountNotLinked' },
        }).then();
      }
    },
  });

  const [isSending, setIsSending] = useState(false);

  return (
    <>
      <Form
        onSubmit={handleSubmit(data => {
          setIsSending(true);
          mutate({
            id: user.id,
            userInput: {
              name: data.name,
              email: data.email,
              image: data.image,
            },
            profileInput: {
              birthdate: new Date(data.birthdate).toISOString(),
              gender: data.gender.id,
              prefecture: data.prefecture.id,
              introduction: data.introduction,
            },
          });
        })}
      >
        <Label htmlFor="profile-edit-form-keyword">表示名</Label>
        <InputControl<UserFormInputDef> id="profile-edit-form-name" name="name" width="100%" control={control} />

        <Label htmlFor="profile-edit-form-keyword">メールアドレス</Label>
        <InputControl<UserFormInputDef> id="profile-edit-form-email" name="email" width="100%" control={control} />

        <Label htmlFor="profile-edit-form-keyword">プロフィール画像</Label>
        <InputControl<UserFormInputDef> id="profile-edit-form-email" name="image" width="100%" control={control} />

        <Label htmlFor="profile-edit-form-birthdate">誕生日</Label>
        <InputControl<UserFormInputDef>
          id="profile-edit-form-birthdate"
          type="date"
          name="birthdate"
          width="100%"
          min="1940-01-01"
          max="2023-01-01"
          control={control}
        />

        <Label htmlFor="profile-edit-form-prefecture">活動地域</Label>
        <SelectControl<ILabelItem<PrefectureEnum>, UserFormInputDef>
          name="prefecture"
          control={control}
          options={formOptions.prefecture}
          idKey="id"
          labelKey="label"
          placeholder="活動地域を選ぶ"
        ></SelectControl>

        <Label htmlFor="profile-edit-form-introduction">自己紹介</Label>
        <InputControl<UserFormInputDef>
          id="profile-edit-form-introduction"
          name="introduction"
          width="100%"
          control={control}
        />

        <Spacer size={$spacing.xl}></Spacer>

        <div
          className={css`
            display: grid;
            place-items: center;
          `}
        >
          <Button
            type="submit"
            color="primary"
            icon={faChevronCircleRight}
            label="変更を保存する"
            width="240px"
            iconPosition="rightAbsolute"
            disabled={isSending}
          ></Button>
        </div>
      </Form>
    </>
  );
};
