import { Store } from 'vuex';

import { getModule } from 'vuex-module-decorators';
import Spikes from '~/store/spikes';

/**
 * vuex-module-decorators用の設定
 * storeを増やすたびに追加する
 */

// eslint-disable-next-line import/no-mutable-exports
let spikesStore: Spikes;

function initialiseStores(store: Store<any>): void {
  spikesStore = getModule(Spikes, store);
}

export { spikesStore };

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
