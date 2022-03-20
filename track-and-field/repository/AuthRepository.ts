import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
// eslint-disable-next-line import/no-named-as-default
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

export class AuthRepository {
  public loginWithGoogle() {
    return Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    });
  }
}
