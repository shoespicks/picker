import { objectType } from 'nexus';

export const ColorImages = objectType({
  name: 'ColorImages',
  definition(t) {
    t.nonNull.id('colorId');
    t.nonNull.string('colorCode');
    t.nonNull.list.nonNull.string('imageUrls');
  },
});
