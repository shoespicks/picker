import { athleteLevels, IAthleteLevel } from 'picker-types/types/track-and-field/athleteLevel';
import { IShoeBrand, shoeBrands } from 'picker-types/types/track-and-field/shoeBrands';
import { IShoeColor, shoeColors } from 'picker-types/types/track-and-field/shoeColors';
import { IShoeEnvirloment, shoeEnviroments } from 'picker-types/types/track-and-field/shoeEnviroment';
import { IEventItem, shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { IShoeLaceType, shoeLaceTypes } from 'picker-types/types/track-and-field/shoeLaceTypes';
import { IShoeSearchOrder, shoeSearchOrders } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { NumberRange } from 'shared/constants/type';
import { FormHasOptionKey, FormOptions } from 'shared/hooks/useFormBase';

export type IYears = { id: string; label: string };

const thisYear = new Date().getFullYear();

export const years = Array.from({ length: 4 }).map((_, i) => {
  return thisYear - i;
});

export const yearSearchOptions: IYears[] = years.map(y => ({
  id: y.toString(),
  label: `${y}年`,
}));

export type SearchFormInputDef = {
  events: IEventItem[];
  brands: IShoeBrand[];
  years: IYears[];
  latestOnly: boolean;
  keyword: string;
  athleteLevel: IAthleteLevel[];
  shoeEnviroments: IShoeEnvirloment[];
  shoeLaceType: IShoeLaceType[];
  shoeColor: IShoeColor[];
  priceRange: NumberRange;
  pinCountRange: NumberRange;
  order: IShoeSearchOrder;
};

export type SearchFormInputKey = keyof SearchFormInputDef;

export type SearchFormInput = Partial<SearchFormInputDef>;

export const searchFormInputDefaultValues: SearchFormInput = {
  events: [],
  brands: [],
  years: [],
  latestOnly: true,
  keyword: '',
  athleteLevel: [],
  shoeEnviroments: [],
  shoeLaceType: [],
  shoeColor: [],
  priceRange: [0, 50000],
  pinCountRange: [0, 15],
  order: shoeSearchOrders.highscore,
};

export type SearchFormHasOptionKey = FormHasOptionKey<
  SearchFormInputDef,
  'events' | 'brands' | 'years' | 'athleteLevel' | 'shoeEnviroments' | 'shoeLaceType' | 'shoeColor' | 'order'
>;

export const searchFormOptions: FormOptions<
  SearchFormInputDef,
  FormHasOptionKey<SearchFormInputDef, SearchFormHasOptionKey>
> = {
  events: Object.values(shoeEvents),
  brands: Object.values(shoeBrands),
  years: yearSearchOptions,
  athleteLevel: Object.values(athleteLevels),
  shoeEnviroments: Object.values(shoeEnviroments),
  shoeLaceType: Object.values(shoeLaceTypes),
  shoeColor: Object.values(shoeColors),
  order: Object.values(shoeSearchOrders),
};
