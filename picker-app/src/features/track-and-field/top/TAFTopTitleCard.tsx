import React, { type FC } from 'react';
import { css } from '@emotion/css';
import Image from 'next/future/image';
import { AspectRatio } from 'components/atoms/AspectRatio';
import { Card } from 'components/atoms/Card';
import { Strong } from 'components/atoms/Typography';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  className?: string;
};
export const TAFTopTitleCard: FC<Props> = ({ className }) => (
  <Card className={className} borderWidthPx={2}>
    <AspectRatio ratio={16 / 9}>
      <div className={styles.titleContent}>
        <Strong noWrap className={styles.titleCaption}>
          陸上選手のためのスパイク比較サイト
        </Strong>
        <AspectRatio ratio={6.2}>
          <span className={styles.titleLogoFrame}>
            <Image src="/picker-black.svg" fill alt="picker" />
          </span>
        </AspectRatio>
        <span className={styles.titleSubText}>for Track and Field</span>
      </div>
    </AspectRatio>
  </Card>
);

const styles = {
  titleContent: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 ${$spacing.lg};
    margin: auto 0;
    text-align: center;

    ${mediaGreaterThan('md')} {
      padding: 0 ${$spacing.xl};
    }

    ${mediaGreaterThan('lg')} {
      padding: 0 ${$spacing['2xl']};
    }
  `,
  titleCaption: css`
    font-size: 14px;

    ${mediaGreaterThan('xl')} {
      font-size: 16px;
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
      font-size: 20px;
    }
  `,
};
