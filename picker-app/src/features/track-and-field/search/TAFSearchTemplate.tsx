import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Container } from 'components/atoms/Container';
import { Spacer } from 'components/atoms/Spacer';
import { MultiColumn } from 'components/layout/MultiColumn';
import { SearchFormInput } from 'features/track-and-field/constants/search';
import { TAFSearchFormCard } from 'features/track-and-field/search/searchForm/TAFSearchFormCard';
import { TAFSearchFormModal } from 'features/track-and-field/search/searchForm/TAFSearchFormModal';
import { TAFSearchResultList } from 'features/track-and-field/search/searchResults/TAFSearchResultList';
import { SpikesQuery } from 'graphql/generated/codegen-client';
import { $headerSize } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';
import { useMediaGraterThan } from 'shared/hooks/useMedia';
import { useScroll } from 'shared/hooks/useScroll';

type Props = {
  data?: SpikesQuery;
  currentSearchCondition?: SearchFormInput;
  isLoading?: boolean;
  onSubmit?(input: SearchFormInput): void;
};

export const TAFSearchTemplate: FC<Props> = ({ data, currentSearchCondition, isLoading, onSubmit }) => {
  const isOverLargeMedia = useMediaGraterThan('lg');
  const { isScrolledTop } = useScroll();
  const theme = useTheme();

  return (
    <>
      {!isOverLargeMedia ? (
        <Container
          className={css`
            position: sticky;
            top: calc(${$headerSize});
            z-index: 1;
            background-color: ${theme.background};
            box-shadow: ${!isScrolledTop && theme.shadowLeft};
          `}
        >
          <Spacer size={$spacing.md}></Spacer>
          <TAFSearchFormModal
            currentSearchCondition={currentSearchCondition}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
          <Spacer size={$spacing.md}></Spacer>
        </Container>
      ) : (
        <Spacer size={$spacing.lg}></Spacer>
      )}
      <Container as="section">
        <MultiColumn
          leftColumnElement={
            (isOverLargeMedia && (
              <TAFSearchFormCard
                currentSearchCondition={currentSearchCondition}
                isLoading={isLoading}
                onSubmit={onSubmit}
              />
            )) ||
            undefined
          }
        >
          <TAFSearchResultList results={data?.spikes} isLoading={isLoading} />
        </MultiColumn>
      </Container>
      <Spacer size={$spacing['3xl']}></Spacer>
    </>
  );
};
