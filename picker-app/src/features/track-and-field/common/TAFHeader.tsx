import React, { type FC } from 'react';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { H4 } from 'components/atoms/Typography';
import { Header } from 'features/common/Header';
import { TAFKeywordSearchInput, useTAFKeywordSearchInput } from 'features/track-and-field/common/TAFKeywordSearchInput';
import { $spacing } from 'shared/constants/styles/spacing';
import { Routing } from '../constants/routing';

export const TAFHeader: FC = () => {
  const { keywordSearch } = useTAFKeywordSearchInput();
  return (
    <Header navigationLinks={Routing}>
      <Section>
        <Spacer size={$spacing.lg} />
        <H4>キーワード検索</H4>
        <Spacer size={$spacing.sm} />
        <TAFKeywordSearchInput onSubmit={keywordSearch} />
      </Section>
    </Header>
  );
};
