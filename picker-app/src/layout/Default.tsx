import { PropsWithChildren, useState } from 'react';
import { css } from '@emotion/css';
import { Theme, ThemeProvider } from '@emotion/react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { Footer } from 'features/common/Footer';
import { homeTheme } from 'shared/constants/styles/colors';

type Props = {
  theme?: Theme;
  headerElement?: JSX.Element;
  session?: Session | null;
};

const DefaultLayout = ({ children, theme = homeTheme, headerElement, session }: PropsWithChildren<Props>) => {
  const [queryClient] = useState(() => new QueryClient());
  const styles = getStyles(theme);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
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
