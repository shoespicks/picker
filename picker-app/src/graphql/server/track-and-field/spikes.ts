import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import {
  ISpikeBase,
  TAFAthleteLevel,
  TAFBrands,
  TAFEvents,
  TAFShoeColor,
  TAFShoeLaceType,
} from 'graphql/server/track-and-field/types';
import { spikesLoader } from 'server/loader/track-and-field/spikeLoader';

export const SpikeBase = objectType({
  name: 'SpikeBase',
  definition(t) {
    t.implements(ISpikeBase);
  },
});

export const SpikesInput = inputObjectType({
  name: 'SpikesInput',
  definition(t) {
    t.list.nonNull.field('events', {
      type: nonNull(TAFEvents),
    });
    t.list.nonNull.field('brands', {
      type: nonNull(TAFBrands),
    });
    t.list.nonNull.string('years');
    t.boolean('latestOnly', {
      description: 'trueの場合は最新のみ、falseの場合は最新じゃないもののみ、値がない場合はどちらも',
    });
    t.string('keyword');
    t.list.field('athleteLevel', {
      type: nonNull(TAFAthleteLevel),
    });
    t.boolean('allWeatherOnly', {
      description: 'trueの場合はオールウェザー専用のみ、falseの場合は土兼用のみ、値がない場合はどちらも',
    });
    t.list.field('shoeLaceType', {
      type: nonNull(TAFShoeLaceType),
    });
    t.list.field('shoeColor', {
      type: nonNull(TAFShoeColor),
    });
    t.int('priceRangeMin');
    t.int('priceRangeMax');
    t.int('pinCountRangeMin');
    t.int('pinCountRangeMax');
  },
});

export const SpikesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('spikes', {
      type: nonNull(SpikeBase),
      args: { input: nonNull(SpikesInput) },
      resolve(_, args) {
        return spikesLoader(args.input).then(s => {
          return s;
        });
      },
    });
  },
});
