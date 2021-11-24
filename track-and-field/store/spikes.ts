import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { contentfulClient } from '~/plugins/contentful';
import {
  createSearchInput,
  ISpikesSearchFormValue
} from '~/store/model/searchSpikeInput';
import { ISpikeModel, transrateSpikeEntityToModel } from '~/store/model/spike';

import { ISpikeShoes } from '~/types/generated/contentful';

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

  @Action({ rawError: true })
  async getBySlug(slug: string): Promise<ISpikeModel> {
    const input = {
      content_type: 'spikeShoes',
      'fields.slug': slug
    };

    return await contentfulClient
      .getEntries(input)
      .then((entries: any) => {
        return transrateSpikeEntityToModel(entries.items[0]);
      })
      .catch(() => {
        throw new Error('Spikes#getBySlug() faild');
      });
  }
}
