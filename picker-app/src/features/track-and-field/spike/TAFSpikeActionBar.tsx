import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { SpikeFragment } from 'api/graphql/generated/codegen-client';
import { Card } from 'components/atoms/Card';
import { Spacer } from 'components/atoms/Spacer';
import { Span, Strong } from 'components/atoms/Typography';
import { BuyButtons } from 'components/organisms/BuyButtons';
import { mediaLessThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  spike: SpikeFragment;
};

export const TAFSpikeActionBar: FC<Props> = ({ spike }) => {
  return (
    <Card
      width="100%"
      padding={$spacing.md}
      className={css`
        ${mediaLessThan('md')} {
          display: none;
        }
      `}
    >
      <Span
        color="dark"
        loud
        upperCase
        truncate
        className={css`
          display: block;
        `}
      >
        {spike.brand}
      </Span>
      <Spacer size={$spacing.xs} />
      <Strong>{spike.name}</Strong>
      <Spacer size={$spacing.sm} />
      {spike?.price && (
        <div>
          <Span fontSize="24px" loud bold>
            ¥{spike.price.toLocaleString()}
          </Span>
          <Span semiBold>（税込）</Span>
        </div>
      )}
      <Spacer size={$spacing.md} />
      <BuyButtons
        amazonUrl={spike.amazonUrl || undefined}
        rakutenUrl={spike.rakutenUrl || undefined}
        brandPageUrl={spike.brandPageUrl || undefined}
      ></BuyButtons>
    </Card>
  );
};
