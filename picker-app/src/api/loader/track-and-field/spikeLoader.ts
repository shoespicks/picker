import { spikeEntryBySlug, spikesEntries } from 'api/contentful/track-and-field/contentfulRepository';
import { NexusGenInputs, NexusGenRootTypes } from 'api/graphql/generated/nexus/types';

export const spikesLoader = (input: NexusGenInputs['SpikesInput']): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return spikesEntries(input).then(e => {
    return e;
  });
};

export const spikeLoader = (input: NexusGenInputs['SpikeInput']): Promise<NexusGenRootTypes['Spike']> => {
  return spikeEntryBySlug(input.id);
};
