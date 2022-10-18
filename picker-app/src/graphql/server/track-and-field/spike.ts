import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { ISpikeBase } from 'graphql/server/track-and-field/types';
import { spikeLoader } from 'server/loader/track-and-field/spikeLoader';

export const Spike = objectType({
  name: 'Spike',
  definition(t) {
    t.implements(ISpikeBase);
  },
});

export const SpikeInput = inputObjectType({
  name: 'SpikeInput',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const SpikeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('spike', {
      type: Spike,
      args: { input: nonNull(SpikeInput) },
      resolve(_, args) {
        return spikeLoader(args.input);
      },
    });
  },
});
