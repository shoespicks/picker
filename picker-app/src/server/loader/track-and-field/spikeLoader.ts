import { NexusGenInputs, NexusGenRootTypes } from 'graphql/generated/nexus/types';
import { spikesEntries } from 'server/repository/track-and-field/contentfulRepository';

export const spikesLoader = (input: NexusGenInputs['SpikesInput']): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return spikesEntries(input).then(e => {
    return e;
  });
};
