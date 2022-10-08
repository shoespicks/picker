import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { HomeTopTemplate } from 'features/home/HomeTopTemplate';
import DefaultLayout from 'layout/Default';
import { NextPageWithLayout } from 'pages/_app';

// 陸上以外のサイトが完成するまでは一時的に陸上Topにリダイレクトする
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: '/track-and-field',
    },
  };
};

const Home: NextPageWithLayout = () => {
  return (
    <>
      <HomeTopTemplate></HomeTopTemplate>
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
