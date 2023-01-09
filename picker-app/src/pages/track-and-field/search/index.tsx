import { ReactElement } from 'react';
import { TAF_INDEX_PAGE_LINK } from 'features/track-and-field/constants/routing';
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
  return <TAFLayout links={[TAF_INDEX_PAGE_LINK, { label: "検索結果一覧" }]}>{page}</TAFLayout>;
};

export default TAFSearchPage;
