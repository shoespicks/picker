import { IShoeSearchOrder, shoeSearchOrders } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { atom } from 'recoil';
import { SearchFormInput, searchFormInputDefaultValues } from 'features/track-and-field/constants/search';

export const searchConditionState = atom<SearchFormInput>({
  key: 'tafSpikesSearchCondition',
  default: searchFormInputDefaultValues,
});

export const searchOrderState = atom<IShoeSearchOrder>({
  key: 'tafSpikesSearchOrder',
  default: shoeSearchOrders.highscore,
});
