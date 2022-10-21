import { useMemo } from 'react';
import { map } from 'lodash-es';
import { shoeEnviroments } from 'picker-types/types/track-and-field/shoeEnviroment';
import { IShoeSearchOrder } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { useRecoilState } from 'recoil';
import { SearchFormInput, searchFormInputDefaultValues } from 'features/track-and-field/constants/search';
import { SpikesQueryVariables, useSpikesQuery } from 'graphql/generated/codegen-client';
import { searchConditionState } from 'shared/state/track-and-field.state';

export const useSearchSpike = () => {
  const [searchCondition, setSearchCondition] = useRecoilState(searchConditionState);

  const search = (input: SearchFormInput) => {
    setSearchCondition({
      ...searchFormInputDefaultValues,
      ...input,
    });
  };

  const setSearchOrder = (order: IShoeSearchOrder) => {
    setSearchCondition({
      ...searchCondition,
      order,
    });
  };

  const convertInputToQueryVariables = useMemo((): SpikesQueryVariables => {
    console.log('convertInputToQueryVariables');
    return {
      input: {
        events: map(searchCondition.events, 'id'),
        brands: map(searchCondition.brands, 'id'),
        years: map(searchCondition.years, 'id'),
        latestOnly: searchCondition?.latestOnly ? true : undefined,
        keyword: searchCondition.keyword,
        athleteLevel: map(searchCondition.athleteLevel, 'id'),
        allWeatherOnly:
          !searchCondition.shoeEnviroments?.length ||
          searchCondition.shoeEnviroments.length === Object.keys(shoeEnviroments).length
            ? undefined
            : searchCondition.shoeEnviroments.some(e => e.id === 'allweatherOnly'),
        shoeLaceType: map(searchCondition.shoeLaceType, 'id'),
        shoeColor: map(searchCondition.shoeColor, 'id'),
        priceRangeMin: searchCondition?.priceRange?.[0],
        priceRangeMax: searchCondition?.priceRange?.[1],
        pinCountRangeMin: searchCondition?.pinCountRange?.[0],
        pinCountRangeMax: searchCondition?.pinCountRange?.[1],
        order: searchCondition?.order?.id,
      },
    };
  }, [searchCondition]);

  return {
    currentSearchCondition: searchCondition,
    setSearchOrder,
    search,
    ...useSpikesQuery(convertInputToQueryVariables),
  };
};
