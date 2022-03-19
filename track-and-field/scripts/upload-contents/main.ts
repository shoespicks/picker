import axios from 'axios';
import { SpreadsheetUploader } from './upload-contents';

const PICKER_AMPLIFY_DEPLOY_WEBHOOK_URL_STAGING =
  process.env.PICKER_AMPLIFY_DEPLOY_WEBHOOK_URL_STAGING || '';

// スプレッドシートの内容をContentfulのstaging
const main = async () => {
  const uploader = new SpreadsheetUploader();
  await uploader.initAuth();
  await uploader.uploadSheetImages();
  await uploader.uploadContents();

  // 最後に、stagingをデプロイする
  await axios.post(PICKER_AMPLIFY_DEPLOY_WEBHOOK_URL_STAGING, {}).then(() => {
    console.log('デプロイ開始♪');
  });
};

main().then(() => {
  console.log('実行完了♪');
});
