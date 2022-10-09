import { ReactElement } from 'react';
import { TAFSearchTemplate } from 'features/track-and-field/search/TAFSearchTemplate';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const TAFSearchPage: NextPageWithLayout = () => {
  return (
    <>
      <TAFSearchTemplate></TAFSearchTemplate>
    </>
  );
};

TAFSearchPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};

export default TAFSearchPage;
