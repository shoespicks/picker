import React, { type FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import Image from 'next/future/image';
import { Container } from 'component/atoms/Container';
import { $headerHeight } from 'shared/constants/styles/size';

export const Header: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/">
            <a>
              <Image src="/picker.svg" width={108} height={18} alt="picker" />
            </a>
          </Link>
        </div>
      </Container>
    </header>
  );
};

const getStyles = (theme: Theme) => ({
  header: css`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${$headerHeight};
    background-color: ${theme.main};
  `,
  headerContent: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
});
