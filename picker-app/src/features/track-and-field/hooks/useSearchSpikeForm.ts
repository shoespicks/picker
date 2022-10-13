import { UseFormProps } from 'react-hook-form';
import {
  SearchFormHasOptionKey,
  SearchFormInput,
  SearchFormInputDef,
  searchFormOptions,
} from 'features/track-and-field/constants/search';

import { useFormBase } from 'shared/hooks/useFormBase';

export const useSearchSpikeForm = (
  props: UseFormProps<SearchFormInputDef> & {
    defaultValues: SearchFormInput;
  }
) => {
  return {
    ...useFormBase<SearchFormInputDef, SearchFormHasOptionKey>(props, searchFormOptions),
  };
};
