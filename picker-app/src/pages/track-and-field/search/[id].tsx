import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { TAF_INDEX_PAGE_LINK, TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
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
      <NextSeo
        title={props.spike.name}
        description="ページの説明"
        openGraph={{
          url: 'ページのURL',
          title: 'ページのタイトル',
          description: 'ページの説明',
          images: [
            {
              url: props.spike.colorImages[0].imageUrls[0],
            },
          ],
        }}
      />
      <TAFSpikeTemplate spike={props.spike}></TAFSpikeTemplate>
    </>
  );
};

TAFSpikePage.getLayout = (page: ReactElement) => {
  return <TAFLayout links={[TAF_INDEX_PAGE_LINK, { label: "検索結果一覧", href: TAF_SEARCH_PAGE_PATH }, { label: "スパイク自身" }]}>{page}</TAFLayout>;
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
