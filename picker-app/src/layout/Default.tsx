import { PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Theme, ThemeProvider } from '@emotion/react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Footer } from 'features/common/footer';
import { homeTheme } from 'shared/constants/styles/colors';

type Props = {
  theme?: Theme;
  headerElement?: JSX.Element;
};

const DefaultLayout = ({ children, theme = homeTheme, headerElement }: PropsWithChildren<Props>) => {
  const queryClient = new QueryClient();
  const styles = getStyles(theme);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <div className={styles.mainContainer}>
            {headerElement}
            <main>{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </QueryClientProvider>
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
