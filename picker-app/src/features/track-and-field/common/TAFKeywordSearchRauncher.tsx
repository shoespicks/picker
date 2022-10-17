import React, { type FC } from 'react';
import router from 'next/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputButton } from 'components/molecules/InputButton';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';

export const TAFKeywordSearchRauncher: FC = () => {
  const keywordSearch = () => {
    router.push(TAF_SEARCH_PAGE_PATH).then();
  };

  return (
    <InputButton
      buttonColor="primary"
      buttonIcon={faSearch}
      placeholder="キーワードを入力"
      onClick={keywordSearch}
    ></InputButton>
  );
};
