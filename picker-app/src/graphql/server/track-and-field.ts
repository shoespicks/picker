import { enumType, extendType, inputObjectType, interfaceType, nonNull, objectType } from 'nexus';
import { athleteLevels } from 'picker-types/types/track-and-field/athleteLevel';
import { shoeBrands } from 'picker-types/types/track-and-field/shoeBrands';
import { shoeColors } from 'picker-types/types/track-and-field/shoeColors';
import { shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { shoeLaceTypes } from 'picker-types/types/track-and-field/shoeLaceTypes';
import { spikesLoader } from 'server/loader/track-and-field/spikeLoader';

export const ITAFShoeColorImages = objectType({
  name: 'ITAFShoeColorImages',
  definition(t) {
    t.nonNull.field('colorId', {
      type: nonNull(TAFShoeColor),
    });
    t.nonNull.string('colorCode');
    t.nonNull.list.nonNull.string('imageUrls');
  },
});

export const ITAFShoeEvents = objectType({
  name: 'ITAFShoeEvents',
  definition(t) {
    t.nonNull.field('id', {
      type: nonNull(TAFEvents),
    });
    t.nonNull.string('label');
  },
});

export const ISpikeBase = interfaceType({
  name: 'ISpikeBase',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.string('nameEn');
    t.field('brand', {
      type: TAFBrands,
    });
    t.list.field('events', {
      type: nonNull(ITAFShoeEvents),
    });
    t.int('score');
    t.int('price');
    t.int('weight');
    t.boolean('allWeatherOnly');
    t.float('lightnessScore');
    t.float('widthScore');
    t.float('angleScore');
    t.float('gripScore');
    t.float('hardnessScore');
    t.nonNull.list.field('colorImages', {
      type: nonNull(ITAFShoeColorImages),
    });
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
    t.nonNull.int('priceRangeMin');
    t.nonNull.int('priceRangeMax');
    t.nonNull.int('pinCountRangeMin');
    t.nonNull.int('pinCountRangeMax');
  },
});

export const SpikeQuery = extendType({
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

export const TAFEvents = enumType({
  name: 'TAFEvents',
  members: Object.keys(shoeEvents),
});

export const TAFBrands = enumType({
  name: 'TAFBrands',
  members: Object.keys(shoeBrands),
});

export const TAFAthleteLevel = enumType({
  name: 'TAFAthleteLevel',
  members: Object.keys(athleteLevels),
});

export const TAFShoeLaceType = enumType({
  name: 'TAFShoeLaceType',
  members: Object.keys(shoeLaceTypes),
});

export const TAFShoeColor = enumType({
  name: 'TAFShoeColor',
  members: Object.keys(shoeColors),
});
