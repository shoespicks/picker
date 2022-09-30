import React, { type FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import Image from 'next/future/image';
import { Container } from 'component/atoms/container';

export const Header: FC = () => (
  <header className={styles.header}>
    <Container>
      <div className={styles.headerContent}>
        <Link href="/">
          <a>
            <Image src="/images/logo/picker-text.svg" width={108} height={18} alt="picker" />
          </a>
        </Link>
      </div>
    </Container>
  </header>
);

const styles = {
  header: css`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: black;
  `,
  headerContent: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
};
