import { ReactElement } from 'react';
import DefaultLayout from 'layout/Default';
import { NextPageWithLayout } from 'pages/_app';

const WelcomePage: NextPageWithLayout = props => {
  return (
    <>
      <p>よくきたな！</p>
    </>
  );
};

WelcomePage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default WelcomePage;
