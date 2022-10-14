import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing-path';
import { TAFSpikeTemplate } from 'features/track-and-field/spike/TAFSpikeTemplate';
import { useFetchData } from 'graphql/custom-fetcher';
import {
  Spike,
  SpikeDocument,
  SpikeQuery,
  SpikeQueryVariables,
  SpikesDocument,
  SpikesQuery,
  SpikesQueryVariables,
} from 'graphql/generated/codegen-client';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';

type Props = InferGetStaticPropsType<typeof getStaticProps> & {
  spike: Spike;
};

const TAFSpikePage: NextPageWithLayout<Props> = props => {
  return (
    <>
      <TAFSpikeTemplate spike={props.spike}></TAFSpikeTemplate>
    </>
  );
};

TAFSpikePage.getLayout = (page: ReactElement) => {
  return <TAFLayout>{page}</TAFLayout>;
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params?.id) {
    throw 'idが存在しません';
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = await useFetchData<SpikeQuery, SpikeQueryVariables>(SpikeDocument).bind(null, {
    input: { id: params.id.toString() ?? '' },
  })();

  console.log('getStaticProps');
  console.log(data);

  return {
    props: {
      spike: data.spike[0],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = await useFetchData<SpikesQuery, SpikesQueryVariables>(SpikesDocument).bind(null, { input: {} })();

  const paths = data?.spikes.map(spike => `${TAF_SEARCH_PAGE_PATH}/${spike.id}`) ?? [];

  return {
    paths: paths,
    fallback: false,
  };
};

export default TAFSpikePage;
