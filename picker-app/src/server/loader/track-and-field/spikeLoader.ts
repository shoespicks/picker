import { Entry } from 'contentful';
import { NexusGenArgTypes, NexusGenInputs, NexusGenRootTypes } from 'graphql/generated/nexus/types';
import { ISpikeShoesFields } from '../../../../../product-types/generated/contentful';
import { ISpikesSearchParams, spikes } from '../../repository/track-and-field/contentfulRepository';

export const spikesLoader = (args: NexusGenArgTypes['Query']['spikes']): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return spikes(createSearchParams(args.input)).then(entries => {
    return entries.items.map(item => translateSpikeEntryToSpikeBase(item));
  });
};

// 検索条件フォームの値をAPIの検索条件に変換
export const createSearchParams = (
  formValue: NexusGenInputs['SpikesInput'],
  overRideParams: Partial<ISpikesSearchParams> = {}
) => {
  const input: ISpikesSearchParams = {
    content_type: 'spikeShoes',
    // キーワード
    query: formValue?.keyword || undefined,

    // 種目
    'fields.events[in]': formValue?.events?.join(',') || undefined,

    ...overRideParams,
  };
  return input;
};

export const translateSpikeEntryToSpikeBase = (entry: Entry<ISpikeShoesFields>): NexusGenRootTypes['SpikeBase'] => {
  return {
    id: entry.fields.slug,
    name: entry.fields.name,
    body: entry.fields.slug,
    published: false,
  };
};
