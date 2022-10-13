import { useState } from 'react';
import { SearchFormInput } from 'features/track-and-field/constants/search';
import { SpikesQueryVariables, useSpikesQuery } from 'graphql/generated/codegen-client';

export const useSearchSpike = (defaultCondition: SearchFormInput) => {
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
      events: input.events?.length ? input.events?.map(e => e.id) : undefined,
    },
  };
};
