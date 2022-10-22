import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { H3 } from 'components/atoms/Typography';

import { TAFSpikeCardCarousel } from 'features/track-and-field/common/TAFSpikeCardCarousel';
import { SpikeBase } from 'graphql/generated/codegen-client';
import { $spacing } from 'shared/constants/styles/spacing';

export type Props = {
  shortDistanceData: SpikeBase[];
  middleDistanceData: SpikeBase[];
  longDistanceData: SpikeBase[];
  jumpingData: SpikeBase[];
  throwingData: SpikeBase[];
};

export const TAFTopRecommends: FC<Props> = ({
  shortDistanceData,
  middleDistanceData,
  longDistanceData,
  jumpingData,
  throwingData,
}) => {
  return (
    <div
      className={css`
        > * + * {
          margin-top: ${$spacing['3xl']};
        }
      `}
    >
      <Section>
        <H3>短距離のおすすめ</H3>
        <Spacer size={$spacing.md} />
        <TAFSpikeCardCarousel spikes={shortDistanceData}></TAFSpikeCardCarousel>
      </Section>
      <Section>
        <H3>中距離のおすすめ</H3>
        <Spacer size={$spacing.md} />
        <TAFSpikeCardCarousel spikes={middleDistanceData}></TAFSpikeCardCarousel>
      </Section>
      <Section>
        <H3>長距離のおすすめ</H3>
        <Spacer size={$spacing.md} />
        <TAFSpikeCardCarousel spikes={longDistanceData}></TAFSpikeCardCarousel>
      </Section>
      <Section>
        <H3>跳躍のおすすめ</H3>
        <Spacer size={$spacing.md} />
        <TAFSpikeCardCarousel spikes={jumpingData}></TAFSpikeCardCarousel>
      </Section>
      <Section>
        <H3>投擲のおすすめ</H3>
        <Spacer size={$spacing.md} />
        <TAFSpikeCardCarousel spikes={throwingData}></TAFSpikeCardCarousel>
      </Section>
    </div>
  );
};

const styles = {
  searchLauncher: css`
    width: 100%;
  `,
  linkContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: ${$spacing.sm} ${$spacing.md};
  `,
  link: css`
    display: inline-flex;
  `,
};
