import {
  Action,
  config,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators';
import { $authRepository } from '~/plugins/repository';
import { User } from '~/store/model/user';

config.rawError = true;

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true
})
export default class Auth extends VuexModule {
  private _loginUser?: User;

  get loginUser(): User | undefined {
    return this._loginUser;
  }

  @Mutation
  private setLoginUser(val: User) {
    this._loginUser = val;
  }

  @Action
  async loginWithGoogle() {
    await $authRepository.loginWithGoogle();
  }

  @Action
  async listenAuth() {
    await $authRepository.listenAuth().then((user) => {
      console.log('届いたよ♪');
      console.log(user);
    });
  }
}
