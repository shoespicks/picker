import React, { type FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import { css } from '@emotion/css';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  leftColumnsImageSrc?: string;
  rightColumnsImageSrc?: string;
  minHeight?: Size;
};

export const SideImageContent: FC<PropsWithChildren<Props>> = ({
  leftColumnsImageSrc,
  rightColumnsImageSrc,
  minHeight,
  children,
}) => {
  return (
    <div className={styles.container(!!leftColumnsImageSrc)}>
      {leftColumnsImageSrc && (
        <div className={styles.image(minHeight)}>
          <Image src={leftColumnsImageSrc} layout="fill" objectFit="cover" alt="image"></Image>
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {rightColumnsImageSrc && (
        <div className={styles.image(minHeight)}>
          <Image src={rightColumnsImageSrc} layout="fill" objectFit="cover" alt="image"></Image>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: (hasLeftColumn: boolean) => css`
    display: flex;
    flex-direction: ${hasLeftColumn ? 'column-reverse' : 'column'};
    gap: ${$spacing['3xl']};

    ${mediaGreaterThan('md')} {
      flex-direction: row;
    }
  `,
  image: (minHeight: Size = '280px') => css`
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    min-height: ${minHeight};
  `,
  content: css`
    flex: 1 1 auto;
    min-width: 40%;
  `,
};
