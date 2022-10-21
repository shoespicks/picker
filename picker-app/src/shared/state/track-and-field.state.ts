import { atom } from 'recoil';
import { SearchFormInput, searchFormInputDefaultValues } from 'features/track-and-field/constants/search';

export const searchConditionState = atom<SearchFormInput>({
  key: 'tafSpikesSearchCondition',
  default: searchFormInputDefaultValues,
});
