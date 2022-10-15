import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing-path';
import { TAFSpikeTemplate } from 'features/track-and-field/spike/TAFSpikeTemplate';
import { Spike } from 'graphql/generated/codegen-client';
import TAFLayout from 'layout/TrackAndField';
import { NextPageWithLayout } from 'pages/_app';
import { spikeLoader, spikesLoader } from 'server/loader/track-and-field/spikeLoader';

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

  // getStaticPropsはバックエンドで動作するので、バックエンドのコードをそのまま呼ぶ
  const data = await spikeLoader({ id: params.id.toString() });

  console.log('getStaticProps');
  console.log(data[0]);

  return {
    props: {
      spike: data[0],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // getStaticPathsはバックエンドで動作するので、バックエンドのコードをそのまま呼ぶ
  const data = await spikesLoader({});
  const paths = data?.map(spike => `${TAF_SEARCH_PAGE_PATH}/${spike.id}`) ?? [];

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export default TAFSpikePage;
