import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Container } from 'component/atoms/Container';
import { Spacer } from 'component/atoms/Spacer';
import { MultiColumn } from 'component/layout/MultiColumn';
import { SearchFormInput } from 'features/track-and-field/constants/search';
import { TAFSearchResultList } from 'features/track-and-field/search/searchResults/TAFSearchResultList';
import { TAFSearchForm } from 'features/track-and-field/search/TAFSearchForm';
import { SpikesQuery } from 'graphql/generated/codegen-client';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  data?: SpikesQuery;
  defaultValues?: SearchFormInput;
  isLoading?: boolean;
  onSubmit?(input: SearchFormInput): void;
};

export const TAFSearchTemplate: FC<Props> = ({ data, defaultValues, onSubmit }) => {
  return (
    <>
      <Container
        as="section"
        className={css`
          padding-top: ${$spacing.lg};
        `}
      >
        <MultiColumn leftColumnElement={<TAFSearchForm defaultValues={defaultValues} onSubmit={onSubmit} />}>
          <TAFSearchResultList data={data} />
        </MultiColumn>
      </Container>
      <Spacer size="176px"></Spacer>
    </>
  );
};
