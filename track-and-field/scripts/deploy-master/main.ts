import axios from 'axios';

const PICKER_AMPLIFY_DEPLOY_WEBHOOK_URL_MASTER =
  process.env.PICKER_AMPLIFY_DEPLOY_WEBHOOK_URL_MASTER || '';

const main = async () => {
  // Amplifyでmasterブランチを本番デプロイする
  await axios.post(PICKER_AMPLIFY_DEPLOY_WEBHOOK_URL_MASTER, {}).then((res) => {
    console.log(res);
  });
};

main().then(() => {
  console.log('実行完了♪');
});
