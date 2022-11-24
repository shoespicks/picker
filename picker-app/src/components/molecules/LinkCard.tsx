import React, { type FC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/css';
import { A } from 'components/atoms/A';
import { Card } from 'components/atoms/Card';
import { Ratio } from 'components/atoms/Ratio';
import { Spacer } from 'components/atoms/Spacer';
import { Small, Span, Strong } from 'components/atoms/Typography';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  href: string;
  title?: string;
  imageUrl?: string;
  description?: string;
  caption?: string | null;
  className?: string;
};

export const LinkCard: FC<Props> = ({ href, title, imageUrl, caption, description, className }) => {
  return (
    <A href={href}>
      <Card width="200px" padding={$spacing.md} clickable>
        {imageUrl && (
          <>
            <Ratio ratio={4 / 3}>
              <Image src={imageUrl} fill sizes="width: 100%" alt={title || ''}></Image>
            </Ratio>
            <Spacer size={$spacing.sm} />
          </>
        )}
        {caption && (
          <Small
            loud
            upperCase
            truncate
            color="dark"
            className={css`
              display: block;
            `}
          >
            {caption}
          </Small>
        )}
        {title && (
          <Strong
            truncate
            className={css`
              display: block;
            `}
          >
            {title}
          </Strong>
        )}
        {description && (
          <Span semiBold truncate>
            {description}
          </Span>
        )}
      </Card>
    </A>
  );
};
