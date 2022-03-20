import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
// eslint-disable-next-line import/named
import { ICredentials } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';

export class AuthRepository {
  public loginWithGoogle() {
    return Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    }).then((t: ICredentials) => {
      console.log('ふええ');
      console.log(t);
    });
  }
}
