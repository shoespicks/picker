import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
// eslint-disable-next-line import/named
import { ICredentials } from '@aws-amplify/core';
import { Auth, Hub } from 'aws-amplify';

export class AuthRepository {
  async loginWithGoogle() {
    Hub.listen('auth', await this.aa);

    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    }).then((t: ICredentials) => {
      console.log('ふええ');
      console.log(t);
    });
  }

  private async aa(data: any) {
    switch (data.payload.event) {
      case 'signIn': {
        // サインインイベントをフック
        const cognitoUser = await Auth.currentAuthenticatedUser();
        console.log(cognitoUser);
        console.log(`signed in ... ${cognitoUser.username}`);
        Hub.remove('auth', this.aa);
        break;
      }
      default:
        break;
    }
  }
}
