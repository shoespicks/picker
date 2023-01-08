import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { shoeEventCategories } from 'picker-types/types/track-and-field/shoeEvents';
import { TAF_INDEX_PAGE_LINK } from 'features/track-and-field/constants/routing';
import { TAFTopTemplate, TAFTopTemplateProps } from 'features/track-and-field/top/TAFTopTemplate';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';
import { spikesLoader } from 'server/loader/track-and-field/spikeLoader';


const TAFIndexPage: NextPageWithLayout<TAFTopTemplateProps> = props => {
  return (
    <>
      <TAFTopTemplate {...props}></TAFTopTemplate>
    </>
  );
};

TAFIndexPage.getLayout = (page: ReactElement) => {
  return <TAFLayout links={[TAF_INDEX_PAGE_LINK]}>{page}</TAFLayout>;
};

export default TAFIndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const shortDistanceData = await spikesLoader({ events: shoeEventCategories.shortDistance.eventCodes, limit: 10 });
  const middleDistanceData = await spikesLoader({ events: shoeEventCategories.middleDistance.eventCodes, limit: 10 });
  const longDistanceData = await spikesLoader({ events: shoeEventCategories.longDistance.eventCodes, limit: 10 });
  const jumpingData = await spikesLoader({ events: shoeEventCategories.jumping.eventCodes, limit: 10 });
  const throwingData = await spikesLoader({ events: shoeEventCategories.throwing.eventCodes });

  return {
    props: {
      shortDistanceData,
      middleDistanceData,
      longDistanceData,
      jumpingData,
      throwingData,
    },
  };
};
