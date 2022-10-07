import { ReactElement } from 'react';
import { css } from '@emotion/css';
import { ThemeProvider } from '@emotion/react';
import { Footer } from 'features/common/footer';
import { Header } from 'features/common/header';
import { trackAndFieldTheme } from 'shared/constants/styles/colors';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={trackAndFieldTheme}>
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
