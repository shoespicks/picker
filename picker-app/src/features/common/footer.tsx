import React, { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';

export const Footer: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <div>
            <Link href="/track-and-field" className={styles.footerLogoFrame}>
              <Image src="/picker.svg" fill sizes="width: 100%" alt="picker" />
            </Link>
          </div>
          <Spacer size={'16px'} axis={'vertical'}></Spacer>
          <div className={styles.footerSignature}>
            <span className={styles.footerSignatureFrame}>
              <Image src="/einja.svg" fill sizes="width: 100%" alt="picker" />
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const getStyles = (theme: Theme) => ({
  footer: css`
    width: 100%;
    background-color: ${theme.main};
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
});
