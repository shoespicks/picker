import {
  SearchFormHasOptionKey,
  SearchFormInput,
  SearchFormInputDef,
  searchFormInputDefaultValues,
  searchFormOptions,
} from 'features/track-and-field/constants/search';

import { useFormBase } from 'shared/hooks/useFormBase';

export const useSearchSpikeForm = (defaultValues: SearchFormInput = searchFormInputDefaultValues) => {
  return {
    ...useFormBase<SearchFormInputDef, SearchFormHasOptionKey>({ defaultValues }, searchFormOptions),
  };
};
