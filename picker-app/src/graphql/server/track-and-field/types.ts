import { enumType, interfaceType, nonNull, objectType } from 'nexus';
import { athleteLevels } from 'picker-types/types/track-and-field/athleteLevel';
import { shoeBrands } from 'picker-types/types/track-and-field/shoeBrands';
import { shoeColors } from 'picker-types/types/track-and-field/shoeColors';
import { shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { shoeLaceTypes } from 'picker-types/types/track-and-field/shoeLaceTypes';

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
