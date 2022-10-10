import 'styles/globals.scss';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import { QueryClient } from '@tanstack/query-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
config.autoAddCss = false;

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || (page => page);
  const queryClient = new QueryClient();

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
