import { HubCapsule } from '@aws-amplify/core/lib/Hub';
import {
  Action,
  config,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators';
import { $authRepository } from '~/plugins/repository';
import { ISignInInput } from '~/store/model/auth';
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
    return await $authRepository.loginWithGoogle();
  }

  @Action
  async signIn(input: ISignInInput) {
    if (!input?.id || !input?.password) {
      return null;
    }
    return await $authRepository.signIn(input.id, input?.password);
  }

  @Action
  async signUp(input: ISignInInput) {
    if (!input.id || !input?.password || !input?.email) {
      return null;
    }

    return await $authRepository.signUp(
      input.id,
      input?.password,
      input?.email
    );
  }

  @Action
  async confirmSignUp(input: ISignInInput) {
    if (!input.id || !input?.verificationCode) {
      return null;
    }

    return await $authRepository
      .confirmSignUp(input.id, input.verificationCode)
      .then(async (complete) => {
        if (!complete) {
          return;
        }
        const user = await this.fetchLoginUser();
        console.log(user);
        return user;
      });
  }

  @Action
  fetchLoginUser() {
    return $authRepository
      .currentAuthenticatedUser()
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @Action
  listenAuth(): void {
    $authRepository.listenAuth(this.listenAuthCallback);
  }

  @Action
  listenAuthCallback(data: HubCapsule): void {
    switch (data?.payload?.event) {
      case 'signIn':
        this.fetchLoginUser().then(() => {
          console.log('signed in のウォッチのやつ♪');
        });
        break;
      default:
        console.log(data);
        break;
    }
  }
}
