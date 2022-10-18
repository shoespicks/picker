import { objectType } from 'nexus';

export const ColorImages = objectType({
  name: 'ColorImages',
  definition(t) {
    t.nonNull.id('colorId');
    t.nonNull.string('colorCode');
    t.nonNull.list.nonNull.string('imageUrls');
  },
});

export const Strength = objectType({
  name: 'Strength',
  definition(t) {
    t.string('icon');
    t.string('label');
    t.string('description');
  },
});

export const KeyFeature = objectType({
  name: 'KeyFeature',
  definition(t) {
    t.nonNull.id('id');
    t.string('title');
    t.list.nonNull.string('imageUrls');
    t.string('description');
  },
});
