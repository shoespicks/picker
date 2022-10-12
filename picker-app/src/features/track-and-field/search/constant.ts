import { IEventItem } from 'picker-types/types/track-and-field/shoeEvents';

export type SearchFormInput = {
  keyword?: string;
  events?: IEventItem;
};

export const defaultSearchFormInputValue: SearchFormInput = {};
