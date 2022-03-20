import {
  CognitoHostedUIIdentityProvider,
  CognitoUser
} from '@aws-amplify/auth';
import { HubCallback } from '@aws-amplify/core/lib/Hub';
import { ICredentials } from '@aws-amplify/core/lib/types';
import { Auth, Hub } from 'aws-amplify';

export class AuthRepository {
  async loginWithGoogle() {
    return await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
      customState: 'googleLogin'
    }).then((t: ICredentials) => {
      console.log('loginWithGoogle');
      console.log(t);
      return t;
    });
  }

  async signIn(id: string, password: string) {
    return await Auth.signIn({ username: id, password }).then(
      (t: ICredentials) => {
        console.log('signIn');
        console.log(t);
        return t;
      }
    );
  }

  async signUp(
    username: string,
    password: string,
    email: string
  ): Promise<any> {
    return await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    }).then((t) => {
      console.log('signUp');
      console.log(t);
      return t;
    });
  }

  async confirmSignUp(id: string, verificationCode: string): Promise<boolean> {
    return await Auth.confirmSignUp(id, verificationCode).then((t) => {
      console.log('confirmSignUp');
      console.log(t);
      return t === 'SUCCESS';
    });
  }

  currentAuthenticatedUser(): Promise<CognitoUser> {
    return Auth.currentAuthenticatedUser();
  }

  listenAuth(callback: HubCallback) {
    Hub.listen('auth', callback, 'listenAuth');
  }
}
