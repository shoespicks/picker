import 'styles/globals.scss';
import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import { QueryClient } from '@tanstack/query-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import GoogleTagManager, { GoogleTagManagerId } from 'components/GoogleTagManager';
import { googleTagManagerId } from 'components/utils/gtm';
config.autoAddCss = false;

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || (page => page);
  const [queryClient] = useState(() => new QueryClient());

  console.log('環境変数TEST');
  console.log(process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID);

  return getLayout(
    <>
      <DefaultSeo
        defaultTitle="デフォルトのタイトル"
        description="デフォルトの説明"
        openGraph={{
          type: 'website',
          title: 'デフォルトのタイトル',
          description: 'デフォルトの説明',
          site_name: 'サイトの名前',
          url: 'サイトのURL',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <GoogleTagManager googleTagManagerId={googleTagManagerId as GoogleTagManagerId} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
