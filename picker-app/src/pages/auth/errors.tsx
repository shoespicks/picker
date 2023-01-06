import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { isString } from 'lodash-es';
import { useSession } from 'next-auth/react';
import { AlertBox } from 'components/atoms/AlertBox';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { Spinner } from 'components/atoms/Spinner';
import { H2 } from 'components/atoms/Typography';
import { LoginLauncher } from 'features/common/LoginLauncher';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';
import { AUTH_ERROR_MESSAGES } from 'shared/constants/auth/errors';
import { $spacing } from 'shared/constants/styles/spacing';

const ErrorPage: NextPageWithLayout = () => {
  const { data: session } = useSession();

  const { query, push } = useRouter();
  const callbackUrl = isString(query?.callbackUrl) ? query?.callbackUrl : undefined;

  if (session) {
    push(callbackUrl || '/track-and-field').then();
    return <Spinner></Spinner>;
  }

  const errorMessage = isString(query?.error) && AUTH_ERROR_MESSAGES[query?.error];

  return (
    <Container maxWidth={'640px'}>
      <Spacer size={$spacing.lg}></Spacer>
      <H2>認証エラーが発生しました</H2>
      <Spacer size={$spacing.md}></Spacer>
      <p>再度ログインしてください。</p>
      <Spacer size={$spacing.lg}></Spacer>
      <AlertBox>{errorMessage}</AlertBox>
      <Spacer size={$spacing.lg}></Spacer>
      <LoginLauncher axis="vertical" callbackUrl={callbackUrl}></LoginLauncher>
    </Container>
  );
};

ErrorPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};

export default ErrorPage;
