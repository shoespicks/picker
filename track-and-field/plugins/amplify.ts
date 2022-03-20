import { Amplify } from 'aws-amplify';
import awsConfig from '../aws-exports';

const isLocalhost: boolean = process.env.ENV === 'local';

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [redirectSignIn, localRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(',');

const [redirectSignOut, localRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(',');

console.log(redirectSignIn);
console.log(localRedirectSignIn);
console.log(redirectSignOut);
console.log(localRedirectSignOut);

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: !isLocalhost
      ? redirectSignIn
      : localRedirectSignIn,
    redirectSignOut: !isLocalhost
      ? redirectSignOut
      : localRedirectSignOut
  }
};

export default () => {
  Amplify.configure(updatedAwsConfig);
};
