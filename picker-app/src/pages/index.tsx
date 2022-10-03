import { ReactElement } from 'react';
import { TAFTopTemplate } from 'features/track-and-field/top/TAFTopTemplate';
import DefaultLayout from 'layout/default';
import { NextPageWithLayout } from 'pages/_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <TAFTopTemplate></TAFTopTemplate>
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
