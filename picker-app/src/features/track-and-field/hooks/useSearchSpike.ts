import { useState } from 'react';
import { map } from 'lodash-es';
import { shoeEnviroments } from 'picker-types/types/track-and-field/shoeEnviroment';
import { IShoeSearchOrder, shoeSearchOrders } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { SearchFormInput } from 'features/track-and-field/constants/search';
import { SpikesQueryVariables, useSpikesQuery } from 'graphql/generated/codegen-client';

export const useSearchSpike = (defaultCondition: SearchFormInput) => {
  const [searchCondition, setSearchCondition] = useState<SearchFormInput>(defaultCondition);
  const [searchOrder, setSearchOrder] = useState<IShoeSearchOrder>(shoeSearchOrders.highscore);

  const search = (input: SearchFormInput) => {
    setSearchCondition(input);
  };

  return {
    currentSearchCondition: searchCondition,
    searchOrder,
    setSearchOrder,
    search,
    ...useSpikesQuery(convertInputToQueryVariables(searchCondition, searchOrder)),
  };
};

const convertInputToQueryVariables = (input: SearchFormInput, searchOrder?: IShoeSearchOrder): SpikesQueryVariables => {
  console.log('convertInputToQueryVariables');
  return {
    input: {
      events: map(input.events, 'id'),
      brands: map(input.brands, 'id'),
      years: map(input.years, 'id'),
      latestOnly: input?.latestOnly ? true : undefined,
      keyword: input.keyword,
      athleteLevel: map(input.athleteLevel, 'id'),
      allWeatherOnly:
        !input.shoeEnviroments?.length || input.shoeEnviroments.length === Object.keys(shoeEnviroments).length
          ? undefined
          : input.shoeEnviroments.some(e => e.id === 'allweatherOnly'),
      shoeLaceType: map(input.shoeLaceType, 'id'),
      shoeColor: map(input.shoeColor, 'id'),
      priceRangeMin: input?.priceRange?.[0],
      priceRangeMax: input?.priceRange?.[1],
      pinCountRangeMin: input?.pinCountRange?.[0],
      pinCountRangeMax: input?.pinCountRange?.[1],
      order: searchOrder?.id,
    },
  };
};
