import { Entry } from 'contentful';
import { ISpikeShoesFields } from 'picker-types/generated/contentful';
import { NexusGenInputs, NexusGenRootTypes } from 'graphql/generated/nexus/types';
import { ISpikesSearchParams, spikesEntries } from 'server/repository/track-and-field/contentfulRepository';

export const spikesLoader = (input: NexusGenInputs['SpikesInput']): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return spikesEntries(createSearchParams(input)).then(entries => {
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
