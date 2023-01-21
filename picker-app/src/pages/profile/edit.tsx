import React, { ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { Container } from 'components/atoms/Container';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { Spinner } from 'components/atoms/Spinner';
import { H2 } from 'components/atoms/Typography';
import { ProfileEditForm } from 'features/profile/ProfileEditForm';
import { useUserProfileQuery } from 'graphql/generated/codegen-client';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';
import { $spacing } from 'shared/constants/styles/spacing';

const ProfileEditPage: NextPageWithLayout = () => {
  const { data: session } = useSession({ required: true });
  const { data: user, isLoading } = useUserProfileQuery(
    { id: session?.user?.id || '' },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Container>
        <Section>
          <Spacer size={$spacing.xl}></Spacer>
          <H2>プロフィール編集</H2>
          <Spacer size={$spacing.lg}></Spacer>
          {isLoading && <Spinner></Spinner>}
          {!isLoading && user?.userProfile && <ProfileEditForm user={user.userProfile}></ProfileEditForm>}
        </Section>
      </Container>
    </>
  );
};

ProfileEditPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};
export default ProfileEditPage;
