import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { SideImageContent } from 'components/layout/SideImageContent';
import { FancifyHeading } from 'features/common/FancifyHeading';
import { TAFTopFeatureSearchLauncher } from 'features/track-and-field/top/TAFTopFeatureSearchLauncher';
import { TAFTopHero } from 'features/track-and-field/top/TAFTopHero';
import { TAFTopLevelSearchLauncher } from 'features/track-and-field/top/TAFTopLevelSearchLauncher';
import { TAFTopRecommends } from 'features/track-and-field/top/TAFTopRecommends';
import { TAFTopSearchLauncher } from 'features/track-and-field/top/TAFTopSearchLauncher';
import { SpikeBase } from 'graphql/generated/codegen-client';
import { hideOverBreakPointStyle, visibleOverBreakPointStyle } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

export type TAFTopTemplateProps = {
  shortDistanceData: SpikeBase[];
  middleDistanceData: SpikeBase[];
  longDistanceData: SpikeBase[];
  jumpingData: SpikeBase[];
  throwingData: SpikeBase[];
};

export const TAFTopTemplate: FC<TAFTopTemplateProps> = ({ ...spikesData }) => (
  <>
    <Spacer size={$spacing.lg}></Spacer>
    <Container
      className={css`
        position: relative;
      `}
    >
      <TAFTopHero></TAFTopHero>
      <div className={styles.overlaySearchLaunchar}>
        <TAFTopSearchLauncher></TAFTopSearchLauncher>
      </div>
    </Container>
    <Container className={hideOverBreakPointStyle('lg')}>
      <Spacer size={$spacing.xl}></Spacer>
      <TAFTopSearchLauncher></TAFTopSearchLauncher>
    </Container>
    <Spacer size={$spacing['3xl']}></Spacer>
    <Container>
      <SideImageContent rightColumnsImageSrc="/track-and-field/images/top-feature-search-image.jpg">
        <FancifyHeading circleText="01" text="スパイクの特徴から探す" />
        <Spacer size={$spacing.lg} />
        <TAFTopFeatureSearchLauncher />
      </SideImageContent>
    </Container>
    <Spacer size={$spacing['4xl']} />
    <Container>
      <SideImageContent leftColumnsImageSrc="/track-and-field/images/top-level-search-image.jpg">
        <FancifyHeading circleText="02" text="競技力から探す" />
        <Spacer size={$spacing.lg} />
        <TAFTopLevelSearchLauncher />
      </SideImageContent>
    </Container>
    <Spacer size={$spacing['4xl']} />
    <Container>
      <FancifyHeading text="おすすめスパイク" circleText="03" />
      <Spacer size={$spacing['2xl']} />
      <TAFTopRecommends {...spikesData}></TAFTopRecommends>
    </Container>
    <Spacer size="176px"></Spacer>
  </>
);

const styles = {
  overlaySearchLaunchar: cx(
    css`
      position: absolute;
      top: ${$spacing.xl};
      right: calc(${$spacing.lg} + ${$spacing.xl});
      width: 30%;
    `,
    visibleOverBreakPointStyle('lg')
  ),
};
