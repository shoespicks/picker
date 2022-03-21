import { HubCapsule } from '@aws-amplify/core/lib/Hub';
import { Hub } from 'aws-amplify';
import { authStore } from '~/store';

export default () => {
  Hub.listen('auth', (data: HubCapsule) => {
    switch (data?.payload?.event) {
      case 'signIn':
      case 'cognitoHostedUI':
        console.log('signed in のウォッチのやつ♪');
        authStore.fetchLoginUser();
        break;
      case 'signOut':
        console.log('ログアウトかんりょう♪');
        authStore.fetchLoginUser();
        break;
      default:
        console.log(data);
        break;
    }
  });

  authStore.fetchLoginUser();
};
