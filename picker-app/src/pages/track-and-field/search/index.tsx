import { ReactElement } from 'react';
import { useSearchSpike } from 'features/track-and-field/hooks/useSearchSpike';
import { SearchFormInput } from 'features/track-and-field/search/constant';
import { TAFSearchTemplate } from 'features/track-and-field/search/TAFSearchTemplate';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

const TAFSearchPage: NextPageWithLayout = () => {
  const { data, search } = useSearchSpike();

  const onSubmit = (input: SearchFormInput) => {
    console.log(input);
    search(input);
  };

  return (
    <>
      <TAFSearchTemplate data={data} onSubmit={onSubmit}></TAFSearchTemplate>
    </>
  );
};

TAFSearchPage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};

export default TAFSearchPage;
