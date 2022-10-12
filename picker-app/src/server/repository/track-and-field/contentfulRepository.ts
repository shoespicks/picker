import path from 'path';
import { createClient, EntryCollection } from 'contentful';
import { config } from 'dotenv';
import { ISpikeShoesFields } from 'picker-types/generated/contentful';

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
  'fields.allWeatherOnly'?: boolean;
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

export const spikesEntries = (params: ISpikesSearchParams): Promise<EntryCollection<ISpikeShoesFields>> => {
  return contentfulClient.getEntries<ISpikeShoesFields>(params).then();
};
