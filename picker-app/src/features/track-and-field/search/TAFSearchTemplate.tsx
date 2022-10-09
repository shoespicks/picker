import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Container } from 'component/atoms/Container';
import { Spacer } from 'component/atoms/Spacer';
import { MultiColumn } from 'component/layout/MultiColumn';
import { TAFSearchResultList } from 'features/track-and-field/search/searchResults/TAFSearchResultList';
import { TAFSearchForm } from 'features/track-and-field/search/TAFSearchForm';
import { $spacing } from 'shared/constants/styles/spacing';

export const TAFSearchTemplate: FC = () => (
  <>
    <Container
      as="section"
      className={css`
        padding-top: ${$spacing.lg};
      `}
    >
      <MultiColumn leftColumnElement={<TAFSearchForm />}>
        <TAFSearchResultList />
      </MultiColumn>
    </Container>
    <Spacer size="176px"></Spacer>
  </>
);
