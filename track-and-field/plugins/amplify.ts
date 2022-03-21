import { Amplify } from 'aws-amplify';
import awsConfig from '../aws-exports';
import { authStore } from '~/store';

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
  console.log('プラグイン！ロックマン.EXE、トランスミッション！');
  Amplify.configure(updatedAwsConfig);
  authStore.listenAuth();
};
