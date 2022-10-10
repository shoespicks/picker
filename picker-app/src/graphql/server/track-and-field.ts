import { enumType, extendType, inputObjectType, interfaceType, nonNull, objectType } from 'nexus';
import { shoeEvents } from '../../../../product-types/types/track-and-field/shoeEvents';

export const events = enumType({
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
    t.implements('ISpikeBase');
  },
});

export const SpikesInput = inputObjectType({
  name: 'SpikesInput',
  definition(t) {
    t.string('keyword');
    t.list.field('events', {
      type: nonNull('TAFEvents'),
    });
  },
});

export const SpikeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('spikes', {
      type: nonNull('SpikeBase'),
      args: { input: SpikesInput },
      resolve(_, args) {
        console.log('aaaaaaaauaaaaauaa');
        return [
          { id: '1', name: '黒のインクス' + args.input?.keyword + args.input?.events },
          { id: '2', name: '黒のディスト' + args.input?.keyword + args.input?.events },
        ];
      },
    });
  },
});
