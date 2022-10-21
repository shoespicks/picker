import { ReactElement } from 'react';
import { SearchFormInput } from 'features/track-and-field/constants/search';
import { useSearchSpike } from 'features/track-and-field/hooks/useSearchSpike';
import { TAFSearchTemplate } from 'features/track-and-field/search/TAFSearchTemplate';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const TAFSearchPage: NextPageWithLayout = () => {
  const { data, currentSearchCondition, setSearchOrder, isLoading, search } = useSearchSpike();

  const onSubmit = (input: SearchFormInput) => {
    console.log(input);
    search(input);
  };

  return (
    <>
      <TAFSearchTemplate
        data={data}
        currentSearchCondition={currentSearchCondition}
        setSearchOrder={setSearchOrder}
        isLoading={isLoading}
        onSubmit={onSubmit}
      ></TAFSearchTemplate>
    </>
  );
};

TAFSearchPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};

export default TAFSearchPage;
