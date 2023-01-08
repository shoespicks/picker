import { enumType, interfaceType, nonNull, objectType } from 'nexus';
import { athleteLevels } from 'picker-types/types/track-and-field/athleteLevel';
import { shoeBrands } from 'picker-types/types/track-and-field/shoeBrands';
import { shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { shoeLaceTypes } from 'picker-types/types/track-and-field/shoeLaceTypes';
import { shoeSearchOrders } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { ColorImages } from 'graphql/schema/common';

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
      type: nonNull(TAFShoeEvents),
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
      type: nonNull(ColorImages),
    });
  },
});

export const TAFShoeEvents = objectType({
  name: 'TAFShoeEvents',
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

export const TAFShoeOrder = enumType({
  name: 'TAFShoeOrder',
  members: Object.keys(shoeSearchOrders),
});
