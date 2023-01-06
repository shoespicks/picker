import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
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
      <p>ユーザペ〜ジ！！！</p>
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
  const spike = await spikeLoader({ id: params.id.toString() });

  if (!spike) {
    throw 'スパイクが存在しません';
  }

  console.log('getStaticProps');
  console.log(spike);

  return {
    props: {
      spike,
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
