import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { A } from 'components/atoms/A';
import { Button } from 'components/atoms/Button';
import { Card } from 'components/atoms/Card';
import { Spacer } from 'components/atoms/Spacer';
import { Span, Strong } from 'components/atoms/Typography';
import { SpikeFragment } from 'graphql/generated/codegen-client';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  spike: SpikeFragment;
};

export const TAFSpikeActionBar: FC<Props> = ({ spike }) => {
  return (
    <Card width="100%" padding={$spacing.md}>
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
      {spike.amazonUrl && (
        <>
          <Spacer size={$spacing.md} />
          <A href={spike.amazonUrl}>
            <Button
              label="Amazonで購入"
              icon={faChevronCircleRight}
              color="primary"
              width="100%"
              iconPosition="rightAbsolute"
            />
          </A>
        </>
      )}
      {spike.rakutenUrl && (
        <>
          <Spacer size={$spacing.md} />
          <A href={spike.rakutenUrl}>
            <Button
              label="楽天で購入"
              icon={faChevronCircleRight}
              color="primary"
              width="100%"
              iconPosition="rightAbsolute"
            />
          </A>
        </>
      )}
      {spike.brandPageUrl && (
        <>
          <Spacer size={$spacing.md} />
          <A href={spike.brandPageUrl}>
            <Button
              label="公式サイトで購入"
              icon={faChevronCircleRight}
              color="primary"
              width="100%"
              iconPosition="rightAbsolute"
            />
          </A>
        </>
      )}
    </Card>
  );
};
