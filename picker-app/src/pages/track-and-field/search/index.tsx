import { ReactElement } from 'react';
import { SearchFormInput, searchFormInputDefaultValues } from 'features/track-and-field/constants/search';
import { useSearchSpike } from 'features/track-and-field/hooks/useSearchSpike';
import { TAFSearchTemplate } from 'features/track-and-field/search/TAFSearchTemplate';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const TAFSearchPage: NextPageWithLayout = () => {
  const defaultValues = searchFormInputDefaultValues;
  const { data, isLoading, search } = useSearchSpike(defaultValues);

  const onSubmit = (input: SearchFormInput) => {
    console.log(input);
    search(input);
  };

  return (
    <>
      <TAFSearchTemplate
        data={data}
        defaultValues={defaultValues}
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
