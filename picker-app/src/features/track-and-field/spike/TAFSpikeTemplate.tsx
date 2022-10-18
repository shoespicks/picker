import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { MultiColumn } from 'components/layout/MultiColumn';
import { TAFSpikeActionBar } from 'features/track-and-field/spike/TAFSpikeActionBar';
import { TAFSpikeDetail } from 'features/track-and-field/spike/TAFSpikeDetail';
import { TAFSpikeOverview } from 'features/track-and-field/spike/TAFSpikeOverview';
import { Spike } from 'graphql/generated/codegen-client';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  spike: Spike;
};

export const TAFSpikeTemplate: FC<Props> = ({ spike }) => {
  return (
    <>
      <Container
        as="section"
        className={css`
          padding-top: ${$spacing.lg};
        `}
      >
        <MultiColumn
          rightColumnElement={<TAFSpikeActionBar spike={spike}></TAFSpikeActionBar>}
          sideColumnWidth="calc(100px + 16vw)"
          stickyTop={`calc(${$headerSize} + ${$spacing.lg})`}
        >
          <TAFSpikeOverview spike={spike}></TAFSpikeOverview>
          <TAFSpikeDetail spike={spike}></TAFSpikeDetail>
        </MultiColumn>
      </Container>
      <Spacer size="176px"></Spacer>
    </>
  );
};
