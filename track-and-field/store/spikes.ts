import { Entry, EntryCollection } from 'contentful';
import {
  Action,
  config,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators';
import { $spikeRepository } from '~/plugins/repository';
import {
  createDefaultSearchFormValue,
  createSearchParams,
  ISpikesSearchFormInputs,
  ISpikesSearchParams
} from '~/store/model/searchSpikeInput';
import { ISpikeModel, transrateSpikeEntityToModel } from '~/store/model/spike';

import { ISpikeShoesFields } from '~/types/generated/contentful';
import { EventCode } from '~/types/shoes/shoeEvents';
import { IShoeSearchOrder } from '~/types/shoes/shoeSearchOrder';

config.rawError = true;

@Module({
  name: 'spikes',
  stateFactory: true,
  namespaced: true
})
export default class Spikes extends VuexModule {
  private _spikes: ISpikeModel[] = [];
  private _searchFormInputs: ISpikesSearchFormInputs =
    createDefaultSearchFormValue();

  private _searchLoading = false;

  get spikes(): ISpikeModel[] {
    return this._spikes;
  }

  get searchFormInputs(): ISpikesSearchFormInputs {
    return this._searchFormInputs;
  }

  get searchLoading(): boolean {
    return this._searchLoading;
  }

  @Mutation
  private setSpikes(val: ISpikeModel[]) {
    this._spikes = val;
  }

  @Mutation
  private setSearchFormInputs(val: ISpikesSearchFormInputs) {
    this._searchFormInputs = val;
  }

  @Mutation
  private setSearchLoading(val = true) {
    this._searchLoading = val;
  }

  @Action
  async search(formValue: Partial<ISpikesSearchFormInputs>) {
    if (this._searchLoading) {
      return;
    }

    this._updateSearchForm(formValue);

    await this._search().catch(() => {
      throw new Error('Spikes#search() faild');
    });
  }

  @Action
  async changeOrder(order: IShoeSearchOrder) {
    if (this._searchLoading) {
      return;
    }

    this._changeSearchFormValue({ order });

    await this._search().catch(() => {
      throw new Error('Spikes#changeOrder() faild');
    });
  }

  @Action
  async findBySlug(slug: string): Promise<ISpikeModel | null> {
    const entries: EntryCollection<ISpikeShoesFields> = await $spikeRepository
      .search({
        content_type: 'spikeShoes',
        'fields.slug': slug
      } as ISpikesSearchParams)
      .catch(() => {
        throw new Error('Spikes#findBySlug() faild');
      });

    return transrateSpikeEntityToModel(entries.items[0]);
  }

  @Action
  async getRankingByEventCodes(
    eventItem: EventCode[] = [],
    count = 10
  ): Promise<ISpikeModel[]> {
    const entries: EntryCollection<ISpikeShoesFields> = await $spikeRepository
      .search(
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
        throw new Error('Spikes#getRankingByEventCodes() faild');
      });

    return (
      entries?.items?.flatMap(
        (item: Entry<ISpikeShoesFields>) =>
          transrateSpikeEntityToModel(item) || []
      ) || []
    );
  }

  @Action
  private _search(): Promise<void> {
    this.setSearchLoading(true);

    return $spikeRepository
      .search(createSearchParams(this.searchFormInputs))
      .then((items: EntryCollection<ISpikeShoesFields>) => {
        this.setSpikes(
          items.items.flatMap(
            (item: Entry<ISpikeShoesFields>) =>
              transrateSpikeEntityToModel(item) || []
          )
        );
      })
      .finally(() => {
        this.setSearchLoading(false);
      });
  }

  // 新しい検索条件をセット
  @Action
  private _updateSearchForm(formValue: Partial<ISpikesSearchFormInputs> = {}) {
    this.setSearchFormInputs({
      ...createDefaultSearchFormValue(),
      ...formValue
    });
  }

  // 既存検索条件を残して指定された項目のみ更新
  @Action
  private _changeSearchFormValue(input: Partial<ISpikesSearchFormInputs>) {
    this.setSearchFormInputs({
      ...this.searchFormInputs,
      ...input
    });
  }
}
