import { ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { useUserQuery } from 'graphql/generated/codegen-client';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const UserPage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { data: user } = useUserQuery({ id: session?.user?.id || '' });
  return (
    <>
      <p>ユーザペ〜ジ！！！</p>
      <p>{JSON.stringify(user)}</p>
    </>
  );
};

UserPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};
export default UserPage;
