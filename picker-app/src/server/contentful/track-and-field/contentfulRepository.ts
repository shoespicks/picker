import path from 'path';
import { createClient, Entry } from 'contentful';
import { config } from 'dotenv';
import { ISpikeArticlesFields, ISpikeShoesFields } from 'picker-types/generated/contentful';
import { shoeColors } from 'picker-types/types/track-and-field/shoeColors';
import { shoeEnviroments } from 'picker-types/types/track-and-field/shoeEnviroment';
import { shoeEvents } from 'picker-types/types/track-and-field/shoeEvents';
import { shoeLaceTypes } from 'picker-types/types/track-and-field/shoeLaceTypes';
import { ShoeSearchOrderCode, shoeSearchOrders } from 'picker-types/types/track-and-field/shoeSearchOrder';
import { NexusGenInputs, NexusGenRootTypes } from 'graphql/generated/nexus/types';

(!process.env.PICKER_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || !process.env.PICKER_CONTENTFUL_SPACE_ID) &&
  config({ path: path.resolve(process.cwd(), '../.env') });

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

export interface ISpikeFindParams {
  // eslint-disable-next-line camelcase
  content_type: 'spikeShoes';
  'fields.slug': string;
}

export const spikesEntries = (input: NexusGenInputs['SpikesInput']): Promise<NexusGenRootTypes['SpikeBase'][]> => {
  return contentfulClient.getEntries<ISpikeShoesFields>(createSpikesSearchParams(input)).then(entries => {
    return entries.items.map(item => translateSpikeEntryToSpikeBase(item));
  });
};

export const spikeEntryBySlug = async (slug: string): Promise<NexusGenRootTypes['Spike']> => {
  const entries = await contentfulClient.getEntries<ISpikeShoesFields>(createSpikeFindParams(slug));

  return translateSpikeEntryToSpike(entries.items[0]);
};

// 検索条件フォームの値をAPIの検索条件に変換
const createSpikesSearchParams = (
  formValue: NexusGenInputs['SpikesInput'],
  overRideParams: Partial<ISpikesSearchParams> = {}
): ISpikesSearchParams => {
  return {
    content_type: 'spikeShoes',
    'fields.events[in]': formValue?.events?.join(',') || undefined,
    'fields.brand[in]': formValue?.brands?.join(',') || undefined,
    'fields.releaseYear[in]': formValue?.years?.join(',') || undefined,
    'fields.newModels[exists]': formValue?.latestOnly === true ? false : undefined,
    query: formValue?.keyword || undefined,
    'fields.level[in]': formValue?.athleteLevel?.join(',') || undefined,
    'fields.allWeatherOnly': formValue.allWeatherOnly,
    'fields.shoeLaceType[all]': formValue?.shoeLaceType?.join(',') || undefined,
    'fields.price[gte]': formValue?.priceRangeMin || undefined,
    'fields.price[lte]': formValue?.priceRangeMax || undefined,
    'fields.pinNumber[gte]': formValue?.pinCountRangeMin || undefined,
    'fields.pinNumber[lte]': formValue?.pinCountRangeMax || undefined,
    'fields.colors[in]': formValue?.shoeColor?.join(',') || undefined,
    order: getOrderInput(formValue.order || undefined),
    limit: formValue?.limit || undefined,
    ...overRideParams,
  };
};

const createSpikeFindParams = (slug: string): ISpikeFindParams => ({
  content_type: 'spikeShoes',
  'fields.slug': slug,
});

const translateSpikeEntryToSpikeBase = (entry: Entry<ISpikeShoesFields>): NexusGenRootTypes['SpikeBase'] => {
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
    lightnessScore: entry.fields.lightnessScore,
    widthScore: entry.fields.widthScore,
    angleScore: entry.fields.angleScore,
    gripScore: entry.fields.gripScore,
    hardnessScore: entry.fields.hardnessScore,
    colorImages: getImages(entry) || [],
  };
};

const translateSpikeEntryToSpike = (entry: Entry<ISpikeShoesFields>): NexusGenRootTypes['Spike'] => {
  return (
    entry && {
      ...translateSpikeEntryToSpikeBase(entry),
      amazonUrl: entry.fields.spikeArticle?.fields.amazonUrl || null,
      brandPageUrl: entry.fields.spikeArticle?.fields.brandPageUrl || null,
      rakutenUrl: entry.fields.spikeArticle?.fields.rakutenUrl || null,
      strength: getStrength(entry?.fields?.spikeArticle?.fields.strength) || null,
      keyFeature: getKeyFeatures(entry?.fields?.spikeArticle?.fields),
      newModels: entry.fields?.newModels?.flatMap(n => (n?.fields && translateSpikeEntryToSpikeBase(n)) || []) || null,
      recommendItems:
        entry.fields?.recommendItems?.flatMap(r => (r?.fields && translateSpikeEntryToSpikeBase(r)) || []) || null,
      recommendedFor: entry.fields?.spikeArticle?.fields?.recommendedFor || null,
      detailSpec: getDetailSpec(entry),
    }
  );
};

const getDetailSpec = (entry: Entry<ISpikeShoesFields>): NexusGenRootTypes['SpikeDetailSpec'] => {
  return {
    allWeatherOnly: entry.fields.allWeatherOnly ? shoeEnviroments.allweatherOnly.label : shoeEnviroments.soil.label,
    athleteLevel: entry.fields?.level || null,
    events: entry.fields.events?.map(e => shoeEvents[e].label).join(', ') || null,
    madeIn: entry.fields.madeIn || null,
    name: entry.fields.name,
    pinDetail: entry.fields.pinDetail || null,
    price: (entry.fields?.price && `${entry.fields.price.toLocaleString()}（税込み）`) || null,
    releaseYear: (entry.fields.releaseYear && `${entry.fields.releaseYear}年`) || null,
    shoeLaceType: entry.fields.shoeLaceType?.map(t => shoeLaceTypes[t].label).join(', ') || null,
    size:
      ((entry.fields?.minSize || entry.fields.maxSize) && `${entry.fields?.minSize} 〜 ${entry.fields?.maxSize}`) ||
      null,
    soleMaterial: entry.fields?.soleMaterial || null,
    upperMaterial: entry.fields?.upperMaterial || null,
    weight: (entry.fields.weight && `${entry.fields.weight}g （26.0cm片足）`) || null,
  };
};

const getEvents = (events: ISpikeShoesFields['events']): NexusGenRootTypes['TAFShoeEvents'][] | null => {
  return (
    events?.map(e => ({
      id: e,
      label: shoeEvents[e].label,
    })) ?? null
  );
};

const getImages = (entity: Entry<ISpikeShoesFields>): NexusGenRootTypes['ColorImages'][] | undefined => {
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

const getKeyFeatures = (fields?: ISpikeArticlesFields): NexusGenRootTypes['AricleItem'][] | null => {
  if (!fields) {
    return null;
  }

  const keyFeatures: NexusGenRootTypes['AricleItem'][] = [];

  for (let i = 1; i < 5; i++) {
    if (fields[`keyFeatureTitle${i}` as keyof ISpikeArticlesFields]) {
      keyFeatures.push({
        id: i.toString(),
        title: (fields[`keyFeatureTitle${i}` as keyof ISpikeArticlesFields] as string) || '',
        imageUrls: (fields[`keyFeatureImageUrls${i}` as keyof ISpikeArticlesFields] as string[]) || [],
        description: (fields[`keyFeatureDescription${i}` as keyof ISpikeArticlesFields] as string)?.trim() || '',
      });
    }
  }

  return keyFeatures;
};

const getStrength = (strength: Record<string, any> | undefined): NexusGenRootTypes['Strength'][] => {
  return strength?.map((s: { [key: string]: string }) => ({
    icon: s?.icon,
    label: s?.label,
    description: s?.description,
  }));
};

/**
 * 並び順を変換する
 * スコアの高い順ソートは常に適用する
 */
const getOrderInput = (order: ShoeSearchOrderCode = 'highscore'): string | undefined => {
  let orderInput = '';

  if (order !== shoeSearchOrders.highscore.id) {
    const orderObj = shoeSearchOrders[order];

    orderInput = (orderObj.isReverseSearch ? '-' : '') + `fields.${orderObj.fieldId},`;
  }

  return orderInput + `-fields.${shoeSearchOrders.highscore.fieldId}`;
};
