import { enumType, extendType, inputObjectType, interfaceType, nonNull, objectType } from 'nexus';
import { shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { spikesLoader } from 'server/loader/track-and-field/spikeLoader';

export const TAFEvents = enumType({
  name: 'TAFEvents',
  members: Object.keys(shoeEvents),
});

export const ISpikeBase = interfaceType({
  name: 'ISpikeBase',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.string('body');
    t.boolean('published');
  },
});

export const SpikeBase = objectType({
  name: 'SpikeBase',
  definition(t) {
    t.implements(ISpikeBase);
  },
});

export const SpikesInput = inputObjectType({
  name: 'SpikesInput',
  definition(t) {
    t.string('keyword');
    t.list.field('events', {
      type: nonNull(TAFEvents),
    });
  },
});

export const SpikeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('spikes', {
      type: nonNull(SpikeBase),
      args: { input: nonNull(SpikesInput) },
      resolve(_, args) {
        return spikesLoader(args.input);
      },
    });
  },
});
