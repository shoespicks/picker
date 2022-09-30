import { ReactElement } from 'react';
import { css } from '@emotion/css';
import { Footer } from 'features/common/footer';
import { Header } from 'features/common/header';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  mainContainer: css`
    width: 100%;
    min-height: 100vh;
  `,
};

export default DefaultLayout;
