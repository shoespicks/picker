import DefaultLayout from 'layout/default';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <p>index</p>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}


export default Home
