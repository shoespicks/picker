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
  private _loginUser: User | null = null;

  @Mutation
  private setLoginUser(val: any) {
    this._loginUser = val;
  }

  get loginUser(): any | undefined {
    return this._loginUser;
  }

  @Action
  async loginWithGoogle() {
    return await $authRepository.loginWithGoogle();
  }

  @Action
  async loginWithLine() {
    return await $authRepository.loginWithLine();
  }

  @Action
  async signIn(input: ISignInInput) {
    if (!input?.id || !input?.password) {
      return null;
    }
    return await $authRepository
      .signIn(input.id, input?.password)
      .then((user) => {
        return user;
      });
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
      .then((complete) => {
        if (!complete) {
          return;
        }

        return this.fetchLoginUser();
      });
  }

  @Action
  fetchLoginUser() {
    return $authRepository
      .currentAuthenticatedUser()
      .then((user) => {
        if (!user) {
          this.setLoginUser(null);
          console.log(this.loginUser);
          return;
        }

        this.setLoginUser({ ...user });
        console.log(this.loginUser);
      })
      .catch((e) => {
        this.setLoginUser(null);
        console.log(this.loginUser);
        console.log(e);
      });
  }

  @Action
  signOut() {
    $authRepository.signOut().catch((e) => {
      console.log(e);
    });
  }
}
