import axios from 'axios';
import { AMPLIFY_UPLOAD_CONTENTS_WEBHOOK_URL_STAGING } from '../upload-contents/constants';
import { SpreadsheetUploader } from './upload-contents';

// スプレッドシートの内容をContentfulのstaging
const main = async () => {
  const uploader = new SpreadsheetUploader();
  await uploader.initAuth();
  await uploader.uploadSheetImages();
  await uploader.uploadContents();

  // 最後に、stagingをデプロイする
  await axios
    .post(AMPLIFY_UPLOAD_CONTENTS_WEBHOOK_URL_STAGING, {})
    .then(() => {
      console.log('デプロイ開始♪');
    });
};

main().then(() => {
  console.log('実行完了♪');
});
