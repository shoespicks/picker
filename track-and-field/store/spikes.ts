import { Entry, EntryCollection } from 'contentful';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { contentfulClient } from '~/plugins/contentful';
import {
  createDefaultSearchFormValue,
  createSearchParams,
  ISpikesSearchFormInputs,
  ISpikesSearchParams
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
  private _searchFormInputs: ISpikesSearchFormInputs =
    createDefaultSearchFormValue();

  get spikes(): ISpikeModel[] {
    return this._spikes;
  }

  get searchFormInputs(): ISpikesSearchFormInputs {
    return this._searchFormInputs;
  }

  @Mutation private setSpikes(val: ISpikeModel[]) {
    this._spikes = val;
  }

  @Mutation private setSearchFormInputs(val: ISpikesSearchFormInputs) {
    this._searchFormInputs = val;
  }

  @Action
  public async search(formValue: ISpikesSearchFormInputs = {}) {
    await contentfulClient
      .getEntries(createSearchParams(formValue))
      .then((items: any) => {
        this.setSearchFormInputs(formValue);
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
      } as ISpikesSearchParams)
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
        createSearchParams(
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

  // 新しい検索条件をセット
  @Action
  public updateSearchForm(formValue: Partial<ISpikesSearchFormInputs> = {}) {
    this.setSearchFormInputs({
      ...createDefaultSearchFormValue(),
      ...formValue
    });
  }

  // 指定された項目のみ更新
  @Action
  public changeSearchFormValue(input: Partial<ISpikesSearchFormInputs>) {
    input &&
      this.setSearchFormInputs({
        ...this.searchFormInputs,
        ...input
      });
  }
}
