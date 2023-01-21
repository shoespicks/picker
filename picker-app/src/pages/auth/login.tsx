import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { isString } from 'lodash-es';
import { signOut, useSession } from 'next-auth/react';
import { AlertBox } from 'components/atoms/AlertBox';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { Spinner } from 'components/atoms/Spinner';
import { H2 } from 'components/atoms/Typography';
import { LoginLauncher } from 'features/auth/LoginLauncher';
import DefaultLayout from 'layout/Default';
import { NextPageWithLayout } from 'pages/_app';
import { AUTH_ERROR_MESSAGES } from 'shared/constants/auth/errors';
import { $spacing } from 'shared/constants/styles/spacing';

const LoginPage: NextPageWithLayout = () => {
  const { query, push } = useRouter();
  const callbackUrl = isString(query?.callbackUrl) ? query?.callbackUrl : undefined;
  const { data: session } = useSession();

  if (session) {
    session?.user?.hasProfile ? push(callbackUrl || '/track-and-field').then() : signOut().then();
    return <Spinner></Spinner>;
  }

  const errorMessage = isString(query?.error) && AUTH_ERROR_MESSAGES[query?.error];

  return (
    <Container maxWidth={'640px'}>
      <Spacer size={$spacing.lg}></Spacer>
      <H2>ログイン</H2>
      {errorMessage && (
        <>
          <Spacer size={$spacing.lg}></Spacer>
          <AlertBox>{errorMessage}</AlertBox>
        </>
      )}
      <Spacer size={$spacing.lg}></Spacer>
      <LoginLauncher axis="vertical" callbackUrl={callbackUrl}></LoginLauncher>
    </Container>
  );
};

LoginPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default LoginPage;
