import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Container } from 'components/atoms/Container';
import { Radar } from 'components/atoms/Radar';
import { Spacer } from 'components/atoms/Spacer';
import { Spike } from 'graphql/generated/codegen-client';
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
        <p>spikeWorks!</p>
        <p>{spike.id}</p>
        <p>{spike.name}</p>
        <p>{spike.events?.join(',')}</p>
        <p>{spike.brand}</p>
        <p>{spike.allWeatherOnly}</p>
        <Radar data={[4, 3, 2, 4, 5]}></Radar>
      </Container>
      <Spacer size="176px"></Spacer>
    </>
  );
};
