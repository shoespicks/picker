import React, { type FC } from 'react';
import { css } from '@emotion/css';
import Image from 'next/future/image';
import { AspectRatio } from 'component/atoms/AspectRatio';
import { Card } from 'component/atoms/Card';
import { Spacer } from 'component/atoms/Spacer';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';

type Props = {
  className?: string;
};
export const TAFTopTitleCard: FC<Props> = ({ className }) => (
  <Card className={className} borderWidthPx={2}>
    <AspectRatio.Root ratio={2}>
      <div className={styles.titleContent}>
        <AspectRatio.Root ratio={6.2}>
          <span className={styles.titleLogoFrame}>
            <Image src="/picker-black.svg" fill alt="picker" />
          </span>
        </AspectRatio.Root>
        <Spacer size="8px"></Spacer>
        <span className={styles.titleSubText}>for Track and Field</span>
      </div>
    </AspectRatio.Root>
  </Card>
);

const styles = {
  titleContent: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 24px;
    margin: auto 0;
    text-align: center;

    ${mediaGreaterThan('md')} {
      padding: 32px;
    }

    ${mediaGreaterThan('lg')} {
      padding: 40px;
    }
  `,
  titleLogoFrame: css`
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
  `,
  titleSubText: css`
    font-size: 16px;

    ${mediaGreaterThan('sm')} {
      font-size: 18px;
    }

    ${mediaGreaterThan('lg')} {
      font-size: 24px;
    }
  `,
};
