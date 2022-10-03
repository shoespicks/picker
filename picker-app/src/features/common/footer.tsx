import React, { type FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import Image from 'next/future/image';
import { Container } from 'component/atoms/Container';
import { Spacer } from 'component/atoms/Spacer';
import { $colors } from 'shared/constants/styles/colors';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <Container>
      <div className={styles.footerContent}>
        <div>
          <Link href="/">
            <a className={styles.footerLogoFrame}>
              <Image src="/picker.svg" fill alt="picker" />
            </a>
          </Link>
        </div>
        <Spacer size={'16px'} axis={'vertical'}></Spacer>
        <div className={styles.footerSignature}>
          <span className={styles.footerSignatureFrame}>
            <Image src="/einja.svg" fill alt="picker" />
          </span>
        </div>
      </div>
    </Container>
  </footer>
);

const styles = {
  footer: css`
    width: 100%;
    background-color: ${$colors.black};
  `,
  footerContent: css`
    width: 100%;
    padding: 40px 0 16px;
  `,
  footerLogoFrame: css`
    position: relative;
    display: inline-block;
    width: 108px;
    height: 18px;

    ${mediaGreaterThan('xl')} {
      width: 220px;
      height: 32px;
    }
  `,
  footerSignature: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  footerSignatureFrame: css`
    position: relative;
    display: inline-block;
    width: 71px;
    height: 19px;
  `,
};
