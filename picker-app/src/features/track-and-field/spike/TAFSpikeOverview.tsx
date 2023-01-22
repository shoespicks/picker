import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { SpikeFragment } from 'api/graphql/generated/codegen-client';
import { Divider } from 'components/atoms/Divider';
import { Spacer } from 'components/atoms/Spacer';
import { H1, Span } from 'components/atoms/Typography';
import { ColorImageViewer } from 'components/organisms/ColorImageViewer';
import { hideOverBreakPointStyle } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  spike: SpikeFragment;
};

export const TAFSpikeOverview: FC<Props> = ({ spike }) => {
  return (
    <>
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
      <H1>{spike.name}</H1>
      <Spacer size={$spacing.md} breackPoint="lg" overbreackPointSize={$spacing.xl}></Spacer>
      <ColorImageViewer colorImages={spike.colorImages} />
      <div className={hideOverBreakPointStyle('md')}>
        <Spacer size={$spacing.md}></Spacer>
        <Divider></Divider>
        <Spacer size={$spacing.md}></Spacer>
        {spike?.price && (
          <div>
            <Span fontSize="24px" loud bold>
              ¥{spike.price.toLocaleString()}
            </Span>
            <Span bold>（税込）</Span>
          </div>
        )}
      </div>
    </>
  );
};
