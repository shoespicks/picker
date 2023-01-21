import { PropsWithChildren, useState } from 'react';
import { css } from '@emotion/css';
import { Theme, ThemeProvider } from '@emotion/react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { Footer } from 'features/common/Footer';
import { TAFHeader } from 'features/track-and-field/common/TAFHeader';
import { homeTheme } from 'shared/constants/styles/colors';

type Props = {
  theme?: Theme;
  headerElement?: JSX.Element;
};

const DefaultLayout = ({
  children,
  theme = homeTheme,
  headerElement = <TAFHeader></TAFHeader>, // 他のスポーツができるまで
}: PropsWithChildren<Props>) => {
  const [queryClient] = useState(() => new QueryClient());
  const styles = getStyles(theme);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <div className={styles.mainContainer}>
              {headerElement}
              <main>{children}</main>
            </div>
            <Footer />
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

const getStyles = (theme: Theme) => ({
  mainContainer: css`
    width: 100%;
    min-height: 100vh;
    color: ${theme.text['default']};
  `,
});

export default DefaultLayout;
