import path from 'path';
import { createClient, Entry } from 'contentful';
import { config } from 'dotenv';
import { ISpikeShoesFields } from 'picker-types/generated/contentful';
import { shoeColors } from 'picker-types/types/track-and-field/shoeColors';
import { shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { NexusGenInputs, NexusGenRootTypes } from 'graphql/generated/nexus/types';

(!process.env.PICKER_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || !process.env.PICKER_CONTENTFUL_SPACE_ID) &&
  config({ path: path.resolve(process.cwd(), '../.env.local') });

console.log('loadingContentfulRepository');

const contentfulClient = createClient({
  space: process.env.PICKER_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.PICKER_CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIROMENT || 'staging',
});

export interface ISpikesSearchParams {
  // eslint-disable-next-line camelcase
  content_type: 'spikeShoes';
  query?: string;
  'fields.events[in]'?: string;
  'fields.brand[in]'?: string;
  'fields.level[in]'?: string;
  'fields.colors[in]'?: string;
  'fields.allWeatherOnly'?: boolean | null;
  'fields.pinNumber[gte]'?: number;
  'fields.pinNumber[lte]'?: number;
  'fields.releaseYear[in]'?: string;
  'fields.newModels[exists]'?: boolean;
  'fields.price[gte]'?: number;
  'fields.price[lte]'?: number;
  'fields.shoeLaceType[all]'?: string;
  limit?: number;
  order?: string;
}

export interface ISpikeSearchParams {
  // eslint-disable-next-line camelcase
  content_type: 'spikeShoes';
  'fields.slug': string;
}

export const spikesEntries = (input: NexusGenInputs['SpikesInput']): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return contentfulClient.getEntries<ISpikeShoesFields>(createSearchParams(input)).then(entries => {
    return entries.items.map(item => translateSpikeEntryToSpikeBase(item));
  });
};

export const spikeEntryBySlug = (slug: string): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return contentfulClient
    .getEntries<ISpikeShoesFields>({
      content_type: 'spikeShoes',
      'fields.slug': slug,
    })
    .then(entries => {
      return entries.items.map(item => translateSpikeEntryToSpike(item));
    });
};

// 検索条件フォームの値をAPIの検索条件に変換
export const createSearchParams = (
  formValue: NexusGenInputs['SpikesInput'],
  overRideParams: Partial<ISpikesSearchParams> = {}
) => {
  const input: ISpikesSearchParams = {
    content_type: 'spikeShoes',
    'fields.events[in]': formValue?.events?.join(',') || undefined,
    'fields.brand[in]': formValue?.brands?.join(',') || undefined,
    'fields.releaseYear[in]': formValue?.years?.join(',') || undefined,
    'fields.newModels[exists]':
      formValue?.latestOnly === undefined || formValue.latestOnly === null ? undefined : formValue.latestOnly,
    query: formValue?.keyword || undefined,
    'fields.level[in]': formValue?.athleteLevel?.join(',') || undefined,
    'fields.allWeatherOnly': formValue.allWeatherOnly,
    'fields.shoeLaceType[all]': formValue?.shoeLaceType?.join(',') || undefined,
    'fields.price[gte]': formValue?.priceRangeMin || undefined,
    'fields.price[lte]': formValue?.priceRangeMax || undefined,
    'fields.pinNumber[gte]': formValue?.pinCountRangeMin || undefined,
    'fields.pinNumber[lte]': formValue?.pinCountRangeMax || undefined,
    'fields.colors[in]': formValue?.shoeColor?.join(',') || undefined,

    ...overRideParams,
  };
  return input;
};

export const translateSpikeEntryToSpikeBase = (entry: Entry<ISpikeShoesFields>): NexusGenRootTypes['SpikeBase'] => {
  return {
    id: entry.fields.slug,
    name: entry.fields.name,
    nameEn: entry.fields.nameEn,
    brand: entry.fields.brand,
    events: getEvents(entry.fields.events),
    price: entry.fields.price,
    score: entry.fields.score,
    weight: entry.fields.weight,
    allWeatherOnly: entry.fields.allWeatherOnly,
    lightnessScore: entry.fields.lightnessScore, // Int!
    widthScore: entry.fields.widthScore,
    angleScore: entry.fields.angleScore,
    gripScore: entry.fields.gripScore,
    hardnessScore: entry.fields.hardnessScore,
    colorImages: getImages(entry) || [],
  };
};

export const translateSpikeEntryToSpike = (entry: Entry<ISpikeShoesFields>): NexusGenRootTypes['SpikeBase'] => {
  return {
    ...translateSpikeEntryToSpikeBase(entry),
  };
};

const getEvents = (events: ISpikeShoesFields['events']): NexusGenRootTypes['ITAFShoeEvents'][] | undefined => {
  return events?.map(e => ({
    id: e,
    label: shoeEvents[e].label,
  }));
};

const getImages = (entity: Entry<ISpikeShoesFields>): NexusGenRootTypes['ITAFShoeColorImages'][] | undefined => {
  return entity.fields?.colors?.map((color, index) => {
    const colorVariationImageKey: keyof ISpikeShoesFields = `colorVariationImage${
      index + 1
    }` as keyof ISpikeShoesFields;

    return {
      colorId: color,
      colorCode: shoeColors[color]?.code,
      imageUrls: entity.fields[colorVariationImageKey] as string[],
    };
  });
};
