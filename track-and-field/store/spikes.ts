import { Entry, EntryCollection } from 'contentful';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { contentfulClient } from '~/plugins/contentful';
import {
  createSearchInput,
  ISpikesSearchFormValue,
  ISpikesSearchInput
} from '~/store/model/searchSpikeInput';
import { ISpikeModel, transrateSpikeEntityToModel } from '~/store/model/spike';

import { ISpikeShoes, ISpikeShoesFields } from '~/types/generated/contentful';
import { EventCode } from '~/types/shoes/shoeEvents';

@Module({
  name: 'spikes',
  stateFactory: true,
  namespaced: true
})
export default class Spikes extends VuexModule {
  private _spikes: ISpikeModel[] = [];
  private _searchFormValue: ISpikesSearchFormValue =
    _createDefaultSearchFormValue();

  get spikes(): ISpikeModel[] {
    return this._spikes;
  }

  get searchFormValue(): ISpikesSearchFormValue {
    return this._searchFormValue;
  }

  @Mutation private setSpikes(val: ISpikeModel[]) {
    this._spikes = val;
  }

  @Mutation private setSearchFormValue(val: ISpikesSearchFormValue) {
    this._searchFormValue = val;
  }

  @Action
  public async search(formValue: ISpikesSearchFormValue = {}) {
    await contentfulClient
      .getEntries(createSearchInput(formValue))
      .then((items: any) => {
        this.setSearchFormValue(formValue);
        this.setSpikes(
          items.items.map((item: ISpikeShoes) =>
            transrateSpikeEntityToModel(item)
          )
        );
      })
      .catch((e: Error) => {
        console.log(e);
        throw new Error('Spikes#search() faild');
      });
  }

  @Action
  async getBySlug(slug: string): Promise<ISpikeModel | null> {
    const entries: EntryCollection<ISpikeShoesFields> = await contentfulClient
      .getEntries({
        content_type: 'spikeShoes',
        'fields.slug': slug
      } as ISpikesSearchInput)
      .catch(() => {
        throw new Error('Spikes#getBySlug() faild');
      });

    return transrateSpikeEntityToModel(entries.items[0]);
  }

  @Action
  async getRankingByEventCodes(
    eventItem: EventCode[] = [],
    count = 10
  ): Promise<ISpikeModel[]> {
    const entries: EntryCollection<ISpikeShoesFields> = await contentfulClient
      .getEntries(
        createSearchInput(
          {
            limit: count
          },
          {
            'fields.events[in]': eventItem.join(',') || undefined
          }
        )
      )
      .catch(() => {
        throw new Error('Spikes#getBySlug() faild');
      });

    return (
      entries?.items?.flatMap(
        (item: Entry<ISpikeShoesFields>) =>
          transrateSpikeEntityToModel(item) || []
      ) || []
    );
  }

  @Action
  public updateSearchFormValue(formValue: ISpikesSearchFormValue = {}) {
    this.setSearchFormValue({
      ..._createDefaultSearchFormValue(),
      ...formValue
    });
  }
}

function _createDefaultSearchFormValue(): ISpikesSearchFormValue {
  return {
    events: [],
    keyword: undefined,
    brands: [],
    level: [],
    priceRange: [0, 50000],
    pinRange: [0, 15],
    forAllWeatherTrack: false,
    forDirtTrack: false,
    releaseYears: [],
    lastModelOnly: true,
    shoeLaceTypes: [],
    colors: []
  };
}
