/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex';
import { getModule, config } from 'vuex-module-decorators';
import Spikes from '~/store/spikes';
import Auth from '~/store/auth';

config.rawError = true;

/**
 * vuex-module-decorators用の設定
 * storeを増やすたびに追加する
 */
let spikesStore: Spikes;
let authStore: Auth;

function initializeStores(store: Store<any>): void {
  spikesStore = getModule(Spikes, store);
  authStore = getModule(Auth, store);
  authStore.listenAuth();
}

export { spikesStore, authStore };

const initializer = (store: Store<any>) => initializeStores(store);
export const plugins = [initializer];
