import { PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Theme, ThemeProvider } from '@emotion/react';
import { Footer } from 'features/common/footer';
import { Header } from 'features/common/header';
import { homeTheme } from 'shared/constants/styles/colors';

type Props = {
  theme?: Theme;
};

const DefaultLayout = ({ children, theme = homeTheme }: PropsWithChildren<Props>) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.mainContainer}>
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

const styles = {
  mainContainer: css`
    width: 100%;
    min-height: 100vh;
  `,
};

export default DefaultLayout;
