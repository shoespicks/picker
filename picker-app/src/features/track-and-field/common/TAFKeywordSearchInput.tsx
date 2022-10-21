import React, { type FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputButton } from 'components/molecules/InputButton';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
import { useSearchSpike } from 'features/track-and-field/hooks/useSearchSpike';

type Props = {
  onSubmit(keyword: string): void;
};

export const TAFKeywordSearchInput: FC<Props> = ({ onSubmit }) => {
  return (
    <InputButton
      buttonColor="primary"
      buttonIcon={faSearch}
      placeholder="キーワードを入力"
      onSubmit={onSubmit}
    ></InputButton>
  );
};

export const useTAFKeywordSearchInput = () => {
  const { search } = useSearchSpike();
  const router = useRouter();

  const keywordSearch = useCallback(
    (keyword: string) => {
      search({ keyword: keyword });
      router.push(TAF_SEARCH_PAGE_PATH).then();
    },
    [router, search]
  );

  return { keywordSearch };
};
