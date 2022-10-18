import { extendType, inputObjectType, interfaceType, nonNull, objectType } from 'nexus';
import { KeyFeature, Strength, TAFAthleteLevel, TAFShoeEvents, TAFShoeLaceType } from 'graphql/server';
import { ISpikeBase } from 'graphql/server/track-and-field/types';
import { spikeLoader } from 'server/loader/track-and-field/spikeLoader';

export const SpikeDetailSpec = objectType({
  name: 'SpikeDetailSpec',
  definition(t) {
    t.nonNull.string('name');
    t.int('price');
    t.int('weight');
    t.list.field('events', {
      type: nonNull(TAFShoeEvents),
    });
    t.boolean('allWeatherOnly');
    t.string('pinDetail');
    t.int('releaseYear');
    t.string('madeIn');
    t.list.field('shoeLaceType', {
      type: nonNull(TAFShoeLaceType),
    });
    t.string('upperMaterial');
    t.string('soleMaterial');
    t.int('minSize');
    t.int('maxSize');
    t.field('athleteLevel', {
      type: TAFAthleteLevel,
    });
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
      type: nonNull(KeyFeature),
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
