import { ReactElement } from 'react';
import { TAFBreadcrumbs } from 'features/track-and-field/common/TAFBreadcrumbs';
import { TAFSearchTemplate } from 'features/track-and-field/search/TAFSearchTemplate';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const TAFSearchPage: NextPageWithLayout = () => {
  return (
    <>
      <TAFSearchTemplate></TAFSearchTemplate>
      <TAFBreadcrumbs links={[]}/>
    </>
  );
};

TAFSearchPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};

export default TAFSearchPage;
