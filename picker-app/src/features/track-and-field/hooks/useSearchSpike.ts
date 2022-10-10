import { useState } from 'react';
import { defaultSearchFormInputValue, SearchFormInput } from 'features/track-and-field/search/constant';
import { SpikesQueryVariables, useSpikesQuery } from 'graphql/generated/codegen-client';

export const useSearchSpike = (defaultCondition: SearchFormInput = defaultSearchFormInputValue) => {
  const [searchCondition, setSearchCondition] = useState<SearchFormInput>(defaultCondition);

  const search = (input: SearchFormInput) => {
    setSearchCondition(input);
  };

  return { search, ...useSpikesQuery(convertInputToQueryVariables(searchCondition)) };
};

const convertInputToQueryVariables = (input: SearchFormInput): SpikesQueryVariables => {
  return {
    input: {
      keyword: input.keyword,
      events: input.events?.id && [input.events.id],
    },
  };
};
