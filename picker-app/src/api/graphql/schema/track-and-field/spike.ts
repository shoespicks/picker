import { extendType, inputObjectType, interfaceType, nonNull, objectType } from 'nexus';
import { spikeLoader } from '../../../loader/track-and-field/spikeLoader';
import { AricleItem, Strength } from '../index';
import { ISpikeBase } from './types';

export const SpikeDetailSpec = objectType({
  name: 'SpikeDetailSpec',
  definition(t) {
    t.string('name');
    t.string('price');
    t.string('weight');
    t.string('events');
    t.string('allWeatherOnly');
    t.string('pinDetail');
    t.string('releaseYear');
    t.string('madeIn');
    t.string('shoeLaceType');
    t.string('upperMaterial');
    t.string('soleMaterial');
    t.string('size');
    t.string('athleteLevel');
  },
});

export const ISpikeDetail = interfaceType({
  name: 'ISpikeDetail',
  definition(t) {
    t.string('amazonUrl');
    t.string('rakutenUrl');
    t.string('brandPageUrl');
    t.list.field('strength', {
      type: nonNull(Strength),
    });
    t.list.field('keyFeature', {
      type: nonNull(AricleItem),
    });
    t.string('recommendedFor');
    t.field('detailSpec', {
      type: SpikeDetailSpec,
    });
    t.list.field('newModels', {
      type: nonNull(ISpikeBase),
    });
    t.list.field('recommendItems', {
      type: nonNull(ISpikeBase),
    });
  },
});

export const Spike = objectType({
  name: 'Spike',
  definition(t) {
    t.implements(ISpikeBase);
    t.implements(ISpikeDetail);
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
