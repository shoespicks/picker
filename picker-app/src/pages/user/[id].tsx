import { ReactElement } from 'react';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const UserPage: NextPageWithLayout = () => {
  return (
    <>
      <p>ユーザペ〜ジ！！！</p>
    </>
  );
};

UserPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};
export default UserPage;
