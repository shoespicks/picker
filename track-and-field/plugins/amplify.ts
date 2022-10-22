import { Amplify } from 'aws-amplify';
import { Storage } from '@aws-amplify/storage';
import awsConfig from '../aws-exports';

const isLocalhost: boolean = process.env.ENV === 'local';

const [redirectSignIn, localRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(',');

const [redirectSignOut, localRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: !isLocalhost ? redirectSignIn : localRedirectSignIn,
    redirectSignOut: !isLocalhost ? redirectSignOut : localRedirectSignOut
  }
};

export default () => {
  Storage.configure(awsConfig);
  Amplify.configure(updatedAwsConfig);
};
