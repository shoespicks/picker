import React, { type FC } from 'react';
import { Container } from 'component/atoms/Container';
import { Spacer } from 'component/atoms/Spacer';
import { TAFTopHero } from 'features/track-and-field/top/TAFTopHero';

export const TAFTopTemplate: FC = () => (
  <>
    <Spacer size="24px" axis="vertical"></Spacer>
    <Container>
      <TAFTopHero></TAFTopHero>
    </Container>
    <Container>
      <p>Template</p>
    </Container>
  </>
);
