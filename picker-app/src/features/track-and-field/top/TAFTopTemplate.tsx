import React, { type FC } from 'react';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { TAFTopHero } from 'features/track-and-field/top/TAFTopHero';
import { TAFTopSearchLauncher } from 'features/track-and-field/top/TAFTopSearchLauncher';
import { $spacing } from 'shared/constants/styles/spacing';

export const TAFTopTemplate: FC = () => (
  <>
    <Spacer size={$spacing.lg}></Spacer>
    <Container>
      <TAFTopHero></TAFTopHero>
    </Container>
    <Spacer size={$spacing.xl}></Spacer>
    <Container>
      <TAFTopSearchLauncher></TAFTopSearchLauncher>
    </Container>
    <Spacer size="176px"></Spacer>
  </>
);
