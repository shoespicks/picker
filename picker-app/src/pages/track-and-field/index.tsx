import { ReactElement } from 'react';
import { TAFTopTemplate } from 'features/track-and-field/top/TAFTopTemplate';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const TAFIndexPage: NextPageWithLayout = () => {
  return (
    <>
      <TAFTopTemplate></TAFTopTemplate>
    </>
  );
};

TAFIndexPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};

export default TAFIndexPage;
