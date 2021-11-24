import axios from 'axios';
import { AMPLIFY_DEPLOY_WEBHOOK_URL_MASTER } from './constants';

const main = async () => {
  // Amplifyでmasterブランチを本番デプロイする
  await axios.post(AMPLIFY_DEPLOY_WEBHOOK_URL_MASTER, {}).then((res) => {
    console.log(res);
  });
};

main().then(() => {
  console.log('実行完了♪');
});
