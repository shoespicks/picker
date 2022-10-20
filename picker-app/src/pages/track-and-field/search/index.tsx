import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { SearchFormInput, searchFormInputDefaultValues } from 'features/track-and-field/constants/search';
import { useSearchSpike } from 'features/track-and-field/hooks/useSearchSpike';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const CSRTAFSearchTemplate = dynamic(
  () => import('features/track-and-field/search/TAFSearchTemplate').then(modules => modules.TAFSearchTemplate),
  { ssr: false }
);

const TAFSearchPage: NextPageWithLayout = () => {
  const { data, currentSearchCondition, isLoading, search } = useSearchSpike(searchFormInputDefaultValues);

  const onSubmit = (input: SearchFormInput) => {
    console.log(input);
    search(input);
  };

  return (
    <>
      <CSRTAFSearchTemplate
        data={data}
        currentSearchCondition={currentSearchCondition}
        isLoading={isLoading}
        onSubmit={onSubmit}
      ></CSRTAFSearchTemplate>
    </>
  );
};

TAFSearchPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};

export default TAFSearchPage;
