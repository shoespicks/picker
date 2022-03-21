import {
  CognitoHostedUIIdentityProvider,
  CognitoUser
} from '@aws-amplify/auth';
import { ICredentials } from '@aws-amplify/core/lib/types';
import { Auth } from 'aws-amplify';

export class AuthRepository {
  async loginWithGoogle() {
    return await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    }).then((t: ICredentials) => {
      console.log('loginWithGoogle');

      this.currentAuthenticatedUser()
        .then((user) => {
          console.log(user);
          return user;
        })
        .catch((e) => {
          console.log(e);
        });
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

  async signOut(): Promise<boolean> {
    return await Auth.signOut().then(() => true);
  }

  currentAuthenticatedUser(): Promise<CognitoUser> {
    return Auth.currentAuthenticatedUser();
  }
}
