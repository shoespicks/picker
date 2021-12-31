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
import { IEventItem } from '~/types/shoes/shoeEvents';
import { shoeSearchOrders } from '~/types/shoes/shoeSearchOrder';

@Module({
  name: 'spikes',
  stateFactory: true,
  namespaced: true
})
export default class Spikes extends VuexModule {
  private _spikes: ISpikeModel[] = [];

  get spikes(): ISpikeModel[] {
    return this._spikes;
  }

  @Mutation setSpikes(val: ISpikeModel[]) {
    this._spikes = val;
  }

  @Action({ rawError: true })
  public async search(formValue: ISpikesSearchFormValue = {}) {
    await contentfulClient
      .getEntries(createSearchInput(formValue))
      .then((items: any) => {
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
  async getRankingByEventCategory(
    eventCategory: IEventItem,
    count = 10
  ): Promise<ISpikeModel[]> {
    const entries: EntryCollection<ISpikeShoesFields> = await contentfulClient
      .getEntries(
        createSearchInput({
          eventOrEventCategory: eventCategory,
          order: shoeSearchOrders.highscore,
          limit: count
        })
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
}
