import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useUserProfileQuery } from 'api/graphql/generated/codegen-client';
import { A } from 'components/atoms/A';
import { Button } from 'components/atoms/Button';
import { Container } from 'components/atoms/Container';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { H2 } from 'components/atoms/Typography';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';
import { $spacing } from 'shared/constants/styles/spacing';

const ProfilePage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { id } = useRouter().query;
  const isOwnPrifile = id === session?.user.id;

  const { data: user } = useUserProfileQuery(
    { id: id?.toString() || '' },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container>
      <Section>
        <Spacer size={$spacing.xl}></Spacer>
        <H2>ゆーざページ！！！</H2>
        <Spacer size={$spacing.lg}></Spacer>
        <p>{JSON.stringify(user)}</p>
        {isOwnPrifile && (
          <A href="/profile/edit">
            <Button icon={faPen}></Button>
          </A>
        )}
      </Section>
    </Container>
  );
};

ProfilePage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};
export default ProfilePage;
