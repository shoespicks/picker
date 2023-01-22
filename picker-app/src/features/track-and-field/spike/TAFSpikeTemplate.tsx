import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Spike } from 'api/graphql/generated/codegen-client';
import { A } from 'components/atoms/A';
import { Button } from 'components/atoms/Button';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { H4 } from 'components/atoms/Typography';
import { MultiColumn } from 'components/layout/MultiColumn';
import { BuyButtons } from 'components/organisms/BuyButtons';
import { TAFSpikeCardCarousel } from 'features/track-and-field/common/TAFSpikeCardCarousel';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
import { TAFSpikeActionBar } from 'features/track-and-field/spike/TAFSpikeActionBar';
import { TAFSpikeDetail } from 'features/track-and-field/spike/TAFSpikeDetail';
import { TAFSpikeOverview } from 'features/track-and-field/spike/TAFSpikeOverview';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  spike: Spike;
};

export const TAFSpikeTemplate: FC<Props> = ({ spike }) => {
  const theme = useTheme();
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
          sideColumnWidth="calc(100px + 15vw)"
          stickyTop={`calc(${$headerSize} + ${$spacing.lg})`}
        >
          <TAFSpikeOverview spike={spike}></TAFSpikeOverview>
          <Spacer size={$spacing.xl} />
          <TAFSpikeDetail spike={spike}></TAFSpikeDetail>
        </MultiColumn>

        {!!spike.recommendItems?.length && (
          <>
            <Spacer size={$spacing['4xl']} />
            <H4>
              <span
                className={css`
                  display: inline-block;
                  padding-bottom: ${$spacing.sm};
                  border-bottom: 1px solid ${theme.border};
                `}
              >
                このスパイクを見ている人におすすめ
              </span>
            </H4>

            {spike?.recommendItems?.length && (
              <>
                <Spacer size={$spacing.md} />
                <TAFSpikeCardCarousel spikes={spike.recommendItems} />
              </>
            )}
          </>
        )}
      </Container>

      <Spacer
        size={$spacing['3xl']}
        className={css`
          ${mediaGreaterThan('md')} {
            display: none;
          }
        `}
      ></Spacer>
      <div
        className={css`
          position: sticky;
          right: 0;
          bottom: 0;
          left: 0;
          padding: ${$spacing.sm} ${$spacing.md};
          background-color: white;

          ${mediaGreaterThan('md')} {
            display: none;
          }
        `}
      >
        <BuyButtons
          amazonUrl={spike.amazonUrl || undefined}
          rakutenUrl={spike.rakutenUrl || undefined}
          brandPageUrl={spike.brandPageUrl || undefined}
          axis="horizontal"
        ></BuyButtons>
      </div>

      <Spacer size={$spacing['3xl']}></Spacer>

      <Container
        className={css`
          display: flex;
          justify-content: center;
        `}
      >
        <A
          href={`${TAF_SEARCH_PAGE_PATH}`}
          className={css`
            display: flex;
            width: 100%;

            ${mediaGreaterThan('md')} {
              width: 340px;
            }
          `}
        >
          <Button label="検索条件に戻る" icon={faChevronCircleLeft} width="100%" iconPosition="leftAbsolute" />
        </A>
      </Container>
      <Spacer size="176px"></Spacer>
    </>
  );
};
