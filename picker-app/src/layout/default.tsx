import { ReactElement } from 'react';
import { css } from '@emotion/css';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className={styles.header}>layout.header</header>
      <main>{children}</main>
      <p>layout.footer</p>
    </>
  );
};

const styles = {
  header: css`
    color: red;
  `,
};

export default DefaultLayout;
