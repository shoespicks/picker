import { EntryCollection } from 'contentful';
import { contentfulClient } from '~/plugins/contentful';
import { ISpikesSearchParams } from '~/store/model/searchSpikeInput';

import { ISpikeShoesFields } from '~/types/generated/contentful';

export class SpikeRepository {
  public search(
    params: ISpikesSearchParams
  ): Promise<EntryCollection<ISpikeShoesFields>> {
    return contentfulClient.getEntries(params);
  }
}
