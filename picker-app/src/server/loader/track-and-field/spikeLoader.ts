import { NexusGenInputs, NexusGenRootTypes } from 'graphql/generated/nexus/types';
import { spikeEntryBySlug, spikesEntries } from 'server/repository/track-and-field/contentfulRepository';

export const spikesLoader = (input: NexusGenInputs['SpikesInput']): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return spikesEntries(input).then(e => {
    return e;
  });
};

export const spikeLoader = (input: NexusGenInputs['SpikeInput']): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return spikeEntryBySlug(input.id).then(e => {
    return e;
  });
};
