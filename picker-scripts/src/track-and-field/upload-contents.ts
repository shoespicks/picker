import path from 'path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createClient } from 'contentful-management';
import { Entry, Environment } from 'contentful-management/types';
import { config } from 'dotenv';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
// eslint-disable-next-line camelcase
import { drive_v3, google } from 'googleapis';
import _ from 'lodash';
import { ISpikeArticlesFields, ISpikeShoesFields } from 'picker-types/generated/contentful';
import { AthleteLevelCode, athleteLevels } from 'picker-types/types/track-and-field/athleteLevel';
import {
  EventCode,
  EventsAndEventCategoriesCode,
  shoeEventsAndEventCategories,
} from 'picker-types/types/track-and-field/shoeEvents';
import { shoeLaceTypes } from 'picker-types/types/track-and-field/shoeLaceTypes';
import { shoePinTypes } from 'picker-types/types/track-and-field/shoePinTypes';
import { IShoeStrength } from 'picker-types/types/track-and-field/shoeStrength';
import sharp from 'sharp';
import { IconName, icons } from './icons';

// https://docs.google.com/spreadsheets/d/1C76UvztImMsTH1SlqnjetZOd9Je_1dQBUuF0yQHnJDE/edit#gid=1513641547
export const SPREADSHEET_KEY = '1C76UvztImMsTH1SlqnjetZOd9Je_1dQBUuF0yQHnJDE';

// マスターシートのシート名
export const SPREADSHEET_MASTER_SHEET_NAME = 'master';

// カラバリ写真のシート名
export const SPREADSHEET_COLORS_SHEET_NAME = 'colors';

// 記事のシート名
export const SPREADSHEET_ARTICLE_SHEET_NAME = 'articles';

// アップロード対象行（または列）につけるフラグのヘッダー
export const SPREADSHEET_UPLOAD_FLAG_ROW_HEADER = 'uploadFlag';
export const SPREADSHEET_ID_HEADER = 'id';
export const SPREADSHEET_CONTENTFUL_SYS_ID_HEADER = 'sysId';
export const SPREADSHEET_CONTENTFUL_ARTICLE_SYS_ID_HEADER = 'articleSysId';
export const SPREADSHEET_ARTICLE_IMG_URL_HEADER_PREFIX = 'keyFeatureImageUrl';
export const SPREADSHEET_COLOR_HEADER = 'color';
export const SPREADSHEET_UPLOADED_IMG_HEADER_PREFIX = 'uploadedImg';
export const SPREADSHEET_DONE_INPUT_HEADER = 'doneInput';

// colorsシート一行あたりの画像の最大数
export const SPREADSHEET_COLOR_IMAGE_COUNT = 5;

// strengthの数
export const SPREADSHEET_STRENGTH_COUNT = 5;

// recommendの数
export const SPREADSHEET_RECOMMEND_COUNT = 5;

// keyFeaturesの数（その他含む）
export const SPREADSHEET_KEY_FEATURES_COUNT = 5;

export const SPREADSHEET_EVENTS_NAMES: (EventCode | 'tjpv' | 'otherThrow')[] = [
  'e100m',
  'e200m',
  'e400m',
  'e110mH',
  'e400mH',
  'e800m',
  'e1500m',
  'e3000m',
  'e3000msc',
  'e5000m',
  'e10000m',
  'highJump',
  'longJump',
  'tjpv',
  'javelinThrow',
  'otherThrow',
];

export const S3_REGION = 'ap-northeast-1';
export const S3_BUCKET = 'piker-trackandfield-images';
export const CLOUDFRONT_BASE_URL = 'https://d1hmrym1m561hp.cloudfront.net/';

(!process.env.PICKER_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || !process.env.PICKER_CONTENTFUL_SPACE_ID) &&
  config({ path: path.resolve(process.cwd(), '../.env.local') });

const managementAccessToken = process.env.PICKER_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || '';
const contentfulSpaceId = process.env.PICKER_CONTENTFUL_SPACE_ID || '';

// スプレッドシート連携は必ずContentfylのstagingにアップロードする
const CONTENTFUL_ENVIRONMENT_ID = 'staging';

const CONTENTFUL_SPIKE_CONTENT_MODEL_ID = 'spikeShoes';
const CONTENTFUL_ARTICLE_CONTENT_MODEL_ID = 'spikeArticles';

export class SpreadsheetUploader {
  private _doc = new GoogleSpreadsheet(SPREADSHEET_KEY);

  // eslint-disable-next-line camelcase
  private _drive: drive_v3.Drive | undefined;

  private _s3Client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: process.env.PICKER_AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.PICKER_AWS_SECRET_ACCESS_KEY || '',
    },
  });

  private _contentfulEnvironment!: Environment;

  private sysIdMap = new Map<string, string>();

  /**
   * GoogleAPIやらContentfulやらの認証を確立
   * newしたあと必ず呼ぶ
   */
  async initAuth() {
    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await this._doc
      .useServiceAccountAuth({
        client_email: process.env.PICKER_GCP_CLIENT_EMAIL || '',
        private_key: process.env.PICKER_GCP_PRIVATE_KEY || '',
      })
      .then();

    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      credentials: {
        client_email: process.env.PICKER_GCP_CLIENT_EMAIL || '',
        private_key: process.env.PICKER_GCP_PRIVATE_KEY || '',
      },
    });

    this._drive = await google.drive({ version: 'v3', auth });

    const contentfulClient = createClient({
      accessToken: managementAccessToken,
    });

    this._contentfulEnvironment = await contentfulClient
      .getSpace(contentfulSpaceId)
      .then(space => space.getEnvironment(CONTENTFUL_ENVIRONMENT_ID));
  }

  /**
   * 画像のシートを見て、要アップロードな画像をS3に上げる
   */
  async uploadSheetImages() {
    console.log('\n-------------------------- 画像アップロード処理開始♪ --------------------------\n');

    const targetRows = await this._getUploadTargetRows(SPREADSHEET_COLORS_SHEET_NAME);
    if (targetRows.length < 1) {
      console.log('画像アップロード対象なし♪');
      return;
    }
    console.log(`アップロード対象行： ${targetRows.length} 行`);

    await Promise.all(
      targetRows.map(
        async (row, index) =>
          await this._uploadRowImages(row).then(() => {
            console.log(
              `${index + 1} / ${targetRows.length} 件目 ${row[SPREADSHEET_ID_HEADER]}${row.color} の行の処理完了♪`
            );
          })
      )
    ).then(() => {
      console.log('colorsシートの画像アップロード処理完了♪');
    });
  }

  /**
   * スパイクマスタ、スパイク記事、スパイク画像のシートを見てContentfulにアップロードする
   */
  async uploadContents() {
    console.log('\n-------------------------- コンテンツアップロード処理開始♪ --------------------------\n');

    const targetRows = await this._getUploadTargetRows(SPREADSHEET_MASTER_SHEET_NAME);

    console.log(`masterシートのアップロード対象行： ${targetRows.length} 行`);

    await this._createTargetRowsEntries(targetRows);

    await this._generateSysIdMap();

    await this._updateTargetEntries(targetRows);
  }

  private async _getUploadTargetRows(sheetName: string) {
    await this._doc.loadInfo();
    return this._doc.sheetsByTitle[sheetName]?.getRows().then(rows => {
      return rows?.filter(row => row[SPREADSHEET_UPLOAD_FLAG_ROW_HEADER] === 'TRUE' && !!row[SPREADSHEET_ID_HEADER]);
    });
  }

  private async _getRowsById(sheetName: string, id: string) {
    await this._doc.loadInfo();
    return this._doc.sheetsByTitle[sheetName]?.getRows().then(rows => {
      return rows?.filter(row => row[SPREADSHEET_ID_HEADER] === id);
    });
  }

  // スパイクIDとContentful上のsysIdのマップを作成
  private async _generateSysIdMap() {
    console.log('sysIdMap作成開始♪');
    await this._doc.loadInfo();
    const rows = await this._doc.sheetsByTitle[SPREADSHEET_MASTER_SHEET_NAME]?.getRows();

    const targetRow = rows.filter(row => row[SPREADSHEET_ID_HEADER]);

    if (!targetRow || !targetRow?.length) {
      console.log('sysId作成対象がないよ♪');
      return;
    }

    console.log(`sysId作成対象件数：${targetRow.length}件`);

    for (const [index, row] of targetRow.entries()) {
      const entry = await this._getEntryBySlug(row[SPREADSHEET_ID_HEADER]);

      // 取得できなかったら次に進む
      if (!entry?.sys?.id) {
        continue;
      }

      if (entry.sys.id !== row[SPREADSHEET_CONTENTFUL_SYS_ID_HEADER]) {
        row[SPREADSHEET_CONTENTFUL_SYS_ID_HEADER] = entry.sys.id;
        await row.save();
      }

      this.sysIdMap.set(row[SPREADSHEET_ID_HEADER], row[SPREADSHEET_CONTENTFUL_SYS_ID_HEADER]);

      console.log(`${index + 1}/${targetRow.length}件目 作成完了♪`);
    }

    console.log('sysIdMap作成完了♪');
  }

  private async _uploadRowImages(row: GoogleSpreadsheetRow) {
    if (!row[SPREADSHEET_ID_HEADER] || !row.color) {
      return;
    }

    return await Promise.all(
      [...Array(SPREADSHEET_COLOR_IMAGE_COUNT)].map(async (_, i) => {
        row[`${SPREADSHEET_UPLOADED_IMG_HEADER_PREFIX}${i + 1}`] = await this._generateUrlAndUploadImage(
          row[`img${i + 1}`],
          `${SPREADSHEET_COLORS_SHEET_NAME}/${row[SPREADSHEET_ID_HEADER]}/${row[SPREADSHEET_COLOR_HEADER]}/img${i + 1}`
        );
      })
    ).then(async () => {
      row[SPREADSHEET_UPLOAD_FLAG_ROW_HEADER] = 'FALSE';
      await row.save();
    });
  }

  /**
   * スプレッドシートのURLから、GoogleドライブのURLの場合はS3にアップロードしたファイル名、
   * それ以外の場合はURLを変換せずに返す
   * @param rawUrl スプレッドシート上の元のURL
   * @param uploadFilePathWithoutExt S3にアップロードした場合につけたいファイル名（拡張子を除く）
   */
  private async _generateUrlAndUploadImage(rawUrl: string, uploadFilePathWithoutExt: string) {
    if (!rawUrl) {
      return undefined;
    }

    const match = rawUrl?.match(/^https:\/\/drive.google.com\/file\/d\/(.*)\/.*/);

    // Google DriveのURLでない場合は、そのURLのままuploadedImgの列に書き込む
    if (!match || match.length < 2) {
      return rawUrl;
    }

    return await this._uploadDriveToS3(match[1], uploadFilePathWithoutExt);
  }

  // Google DriveのファイルをS3にアップロードし、S3のファイルIDをスプレッドシートのuploadedImgの列に書き込む
  private async _uploadDriveToS3(driveFileId: string, filePathWithoutExt: string) {
    const driveFileBuffer = await this._getDriveFileBuffer(driveFileId);

    const key = `${filePathWithoutExt}.jpg`;

    return await this._uploadToS3(driveFileBuffer, key).then(result => {
      if (!result) {
        console.log(key + 'はアップロードできなかったよ♪');
        return '';
      }
      console.log(key + 'をアップロード完了♪');
      return `${CLOUDFRONT_BASE_URL}${key}`;
    });
  }

  private async _getDriveFileBuffer(driveFileId: string): Promise<Buffer | undefined> {
    return (
      this._drive &&
      (await this._drive.files
        .get(
          {
            fileId: driveFileId,
            alt: 'media',
          },
          {
            responseType: 'arraybuffer',
          }
        )
        .then(res => {
          if (res?.data) {
            return Buffer.from(res.data as ArrayBuffer);
          }

          return undefined;
        }))
    );
  }

  private async _uploadToS3(driveFileBuffer: Buffer | undefined, key: string) {
    if (!driveFileBuffer || !key) {
      return;
    }

    // アップロード前に圧縮
    const reducedBuffer = await SpreadsheetUploader._reduceImageSize(driveFileBuffer);

    return (
      reducedBuffer &&
      (await this._s3Client.send(
        new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: key,
          Body: reducedBuffer,
        })
      ))
    );
  }

  // masterシートの行からContentful上に仮オブジェクトを作成
  private async _createTargetRowsEntries(targetRows: GoogleSpreadsheetRow[]) {
    for (const [index, targetRow] of targetRows.entries()) {
      console.log(`${index + 1} / ${targetRows.length} 件目 ${targetRow[SPREADSHEET_ID_HEADER]} をcreate開始♪`);

      await this._createRowEntry(targetRow);

      console.log(`${index + 1} / ${targetRows.length} 件目 ${targetRow[SPREADSHEET_ID_HEADER]} をcreate完了♪`);
    }

    console.log('オブジェクト仮作成完了♪');
  }

  private async _createRowEntry(row: GoogleSpreadsheetRow) {
    const entry = await this._getEntryBySlug(row[SPREADSHEET_ID_HEADER]);

    if (entry) {
      if (row[SPREADSHEET_CONTENTFUL_SYS_ID_HEADER] !== entry?.sys?.id) {
        row[SPREADSHEET_CONTENTFUL_SYS_ID_HEADER] = entry?.sys?.id;
        await row.save();
      }

      console.log(`${row[SPREADSHEET_ID_HEADER]} はcreateしない♪`);
      return;
    }

    const fields = await this._genarateEntryFields(row, true);

    await this._contentfulEnvironment
      .createEntry(CONTENTFUL_SPIKE_CONTENT_MODEL_ID, {
        fields,
      })
      .then(async res => {
        if (res?.sys?.id) {
          row[SPREADSHEET_CONTENTFUL_SYS_ID_HEADER] = res?.sys?.id;
          await row.save().then(() => {
            console.log(`${row[SPREADSHEET_ID_HEADER]} をcreate完了♪`);
          });
        }
      });
  }

  private async _updateTargetEntries(targetRows: GoogleSpreadsheetRow[]) {
    console.log('EntryのUpdate開始♪');
    const articleRows = await this._doc.sheetsByTitle[SPREADSHEET_ARTICLE_SHEET_NAME]?.getRows();

    if (!articleRows) {
      console.log('記事シートの取得失敗♪');
      return;
    }

    for (const [index, targetRow] of targetRows.entries()) {
      console.log(`${index + 1} / ${targetRows.length} 件目 ${targetRow[SPREADSHEET_ID_HEADER]} をupdate開始♪`);

      const targetArticleRow = articleRows?.find(
        articleRow => articleRow[SPREADSHEET_ID_HEADER] === targetRow[SPREADSHEET_ID_HEADER]
      );

      await this._updateEntry(targetRow, targetArticleRow);

      console.log(`${index + 1} / ${targetRows.length} 件目 ${targetRow[SPREADSHEET_ID_HEADER]} をupdate完了♪`);
    }
    console.log('EntryのUpdate完了♪');
  }

  private async _updateEntry(targetRow: GoogleSpreadsheetRow, targetArticleRow?: GoogleSpreadsheetRow) {
    const entry = await this._getEntryBySlug(targetRow[SPREADSHEET_ID_HEADER]);

    if (!entry) {
      console.log(`${targetRow[SPREADSHEET_ID_HEADER]} のentryがないよ♪`);
      return;
    }

    const articleEntry =
      (await this._getArticleEntryBySlug(targetRow[SPREADSHEET_ID_HEADER])) ||
      (await this._createRowArticleEntry(targetRow));

    if (!articleEntry?.sys?.id || !targetArticleRow) {
      console.log(`${targetRow[SPREADSHEET_ID_HEADER]} の記事がないよ♪`);
      return;
    }

    if (
      !targetRow[SPREADSHEET_CONTENTFUL_ARTICLE_SYS_ID_HEADER] ||
      targetRow[SPREADSHEET_CONTENTFUL_ARTICLE_SYS_ID_HEADER] !== articleEntry.sys.id
    ) {
      targetRow[SPREADSHEET_CONTENTFUL_ARTICLE_SYS_ID_HEADER] = articleEntry.sys.id;
      await targetRow.save();
    }

    entry.fields = await this._genarateEntryFields(targetRow);

    articleEntry.fields = await this._genarateArticleEntryFields(targetRow, false, targetArticleRow);

    await Promise.all([entry.update(), articleEntry.update()]).then(async ([updatedEntry, updatedArticleEntry]) => {
      if (
        targetRow[SPREADSHEET_DONE_INPUT_HEADER] === 'TRUE' &&
        targetArticleRow[SPREADSHEET_DONE_INPUT_HEADER] === 'TRUE'
      ) {
        await Promise.all([updatedEntry.publish(), updatedArticleEntry.publish()]);
        return;
      }

      if (updatedEntry.isPublished()) {
        await updatedEntry.unpublish();
      }
    });

    targetRow[SPREADSHEET_UPLOAD_FLAG_ROW_HEADER] = false;
    await targetRow.save();
  }

  private async _createRowArticleEntry(row: GoogleSpreadsheetRow) {
    const fields = await this._genarateArticleEntryFields(row, true);
    return await this._contentfulEnvironment.createEntry(CONTENTFUL_ARTICLE_CONTENT_MODEL_ID, {
      fields,
    });
  }

  private async _getEntryBySlug(slug: string): Promise<Entry> {
    const entries = await this._contentfulEnvironment.getEntries({
      content_type: CONTENTFUL_SPIKE_CONTENT_MODEL_ID,
      'fields.slug': slug,
    });
    return entries.items[0];
  }

  private async _getArticleEntryBySlug(slug: string): Promise<Entry> {
    const entries = await this._contentfulEnvironment.getEntries({
      content_type: CONTENTFUL_ARTICLE_CONTENT_MODEL_ID,
      'fields.slug': slug,
    });
    return entries.items[0];
  }

  private async _genarateEntryFields(
    row: GoogleSpreadsheetRow,
    requiredOnly = false
  ): Promise<{ [key in keyof Partial<ISpikeShoesFields>]: { 'ja-JP': any } }> {
    if (requiredOnly) {
      return {
        name: {
          'ja-JP': row?.name || row[SPREADSHEET_ID_HEADER],
        },
        slug: {
          'ja-JP': row[SPREADSHEET_ID_HEADER],
        },
      };
    }

    const colorsFields = await this._generateColorsFields(row[SPREADSHEET_ID_HEADER]);

    return {
      name: {
        'ja-JP': row?.name || row[SPREADSHEET_ID_HEADER],
      },
      nameEn: {
        'ja-JP': row?.nameEn,
      },
      slug: {
        'ja-JP': row[SPREADSHEET_ID_HEADER],
      },
      alias: {
        'ja-JP': row?.alias?.split(',')?.flatMap((text: string) => (text ? text?.trim() : [])),
      },
      spikeArticle: {
        'ja-JP': {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: row[SPREADSHEET_CONTENTFUL_ARTICLE_SYS_ID_HEADER],
          },
        },
      },
      newModels: {
        'ja-JP': this.sysIdMap.get(row?.new)
          ? [
              {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: this.sysIdMap.get(row?.new),
                },
              },
            ]
          : [],
      },
      recommendItems: {
        'ja-JP': this._generateRecommendItemsFieldValue(row),
      },
      events: {
        'ja-JP': this._generateEventsField(row),
      },
      score: {
        'ja-JP': parseInt(row?.score, 10) ?? undefined,
      },
      price: {
        'ja-JP': SpreadsheetUploader.parseYenToInt(row?.price),
      },
      brand: {
        'ja-JP': row?.brand,
      },
      lightnessScore: {
        'ja-JP': parseFloat(row?.lightnessScore) ?? undefined,
      },
      widthScore: { 'ja-JP': parseFloat(row?.widthScore) ?? undefined },
      hardnessScore: {
        'ja-JP': parseFloat(row?.hardnessScore) ?? undefined,
      },
      angleScore: { 'ja-JP': parseFloat(row?.angleScore) ?? undefined },
      gripScore: { 'ja-JP': parseFloat(row?.gripScore) ?? undefined },
      releaseYear: { 'ja-JP': parseInt(row?.release, 10) ?? undefined },
      level: { 'ja-JP': SpreadsheetUploader.getlevel(row.level) },
      series: {
        'ja-JP': row?.series,
      },
      allWeatherOnly: {
        'ja-JP': row?.ground === '×',
      },
      pinType: {
        'ja-JP': SpreadsheetUploader.getPinType(row?.pinType),
      },
      pinNumber: {
        'ja-JP': parseInt(row?.pinNumber, 10) ?? undefined,
      },
      pinDetail: {
        'ja-JP': row?.pinDetail,
      },
      upperMaterial: {
        'ja-JP': row?.upperMaterial,
      },
      soleMaterial: {
        'ja-JP': row?.soleMaterial,
      },
      shoeLaceType: {
        'ja-JP': SpreadsheetUploader.getShoeLaceType(row?.shoeLaceType),
      },
      minSize: {
        'ja-JP': parseInt(row?.minSize, 10) ?? undefined,
      },
      maxSize: {
        'ja-JP': parseInt(row?.maxSize, 10) ?? undefined,
      },
      weight: {
        'ja-JP': parseInt(row?.weight, 10) ?? undefined,
      },
      accessories: {
        'ja-JP': row?.accessories,
      },
      madeIn: {
        'ja-JP': row?.madeIn,
      },
      ...colorsFields,
    };
  }

  // 指定したIDのカラバリ情報を取得
  private async _generateColorsFields(id: string): Promise<{
    [key in keyof Partial<ISpikeShoesFields>]: { 'ja-JP': any };
  }> {
    const colors: string[] = [];

    const fields: {
      [key in keyof Partial<ISpikeShoesFields>]: { 'ja-JP': any };
    } = {};
    const rows = await this._getRowsById(SPREADSHEET_COLORS_SHEET_NAME, id);
    rows?.length &&
      rows
        .filter(row => row[SPREADSHEET_COLOR_HEADER])
        ?.forEach((row, index) => {
          // カラバリ8個以上、カラバリ重複の場合は処理しない
          if (index > 7 || colors.includes(row[SPREADSHEET_COLOR_HEADER])) {
            return;
          }
          colors.push(row[SPREADSHEET_COLOR_HEADER]);
          fields[`colorVariationImage${index + 1}` as keyof ISpikeShoesFields] = {
            'ja-JP': [...Array(SPREADSHEET_COLOR_IMAGE_COUNT)]
              .map((_, i) => row[`${SPREADSHEET_UPLOADED_IMG_HEADER_PREFIX}${i + 1}`])
              .filter((val: string) => val),
          };
        });

    fields.colors = { 'ja-JP': colors };

    return fields;
  }

  private async _genarateArticleEntryFields(
    row: GoogleSpreadsheetRow,
    requiredOnly = false,
    articleRow?: GoogleSpreadsheetRow
  ): Promise<{
    [key in keyof Partial<ISpikeArticlesFields>]: { 'ja-JP': any };
  }> {
    if (requiredOnly || !articleRow) {
      return {
        slug: {
          'ja-JP': row[SPREADSHEET_ID_HEADER],
        },
      };
    }

    const keyFeaturesImageFields = await this.uploadAndGenerateKeyfeaturesImagesFields(articleRow);

    return {
      slug: {
        'ja-JP': row[SPREADSHEET_ID_HEADER],
      },
      brandPageUrl: {
        'ja-JP': row.brandPageUrl,
      },
      rakutenUrl: {
        'ja-JP': row.rakutenUrl,
      },
      amazonUrl: {
        'ja-JP': row.amazonUrl,
      },
      description: {
        'ja-JP': articleRow.description,
      },
      strength: {
        'ja-JP': this._generateStrengthFieldValue(articleRow),
      },
      recommendedFor: {
        'ja-JP': articleRow.recommendedFor,
      },
      keyFeatureTitle1: {
        'ja-JP': articleRow.keyFeatureTitle1,
      },

      keyFeatureDescription1: {
        'ja-JP': articleRow.keyFeatureDescription1,
      },
      keyFeatureTitle2: {
        'ja-JP': articleRow.keyFeatureTitle2,
      },
      keyFeatureDescription2: {
        'ja-JP': articleRow.keyFeatureDescription2,
      },
      keyFeatureTitle3: {
        'ja-JP': articleRow.keyFeatureTitle3,
      },
      keyFeatureDescription3: {
        'ja-JP': articleRow.keyFeatureDescription3,
      },
      keyFeatureTitle4: {
        'ja-JP': articleRow.keyFeatureTitle4,
      },
      keyFeatureDescription4: {
        'ja-JP': articleRow.keyFeatureDescription4,
      },
      keyFeatureTitle5: {
        'ja-JP': articleRow.keyFeatureTitle5,
      },
      keyFeatureDescription5: {
        'ja-JP': articleRow.keyFeatureDescription5,
      },
      ...keyFeaturesImageFields,
    };
  }

  private async uploadAndGenerateKeyfeaturesImagesFields(articleRow: GoogleSpreadsheetRow): Promise<{
    [key in keyof Partial<ISpikeArticlesFields>]: { 'ja-JP': any };
  }> {
    const keyfeaturesImageFields: {
      [key in keyof Partial<ISpikeArticlesFields>]: { 'ja-JP': any };
    } = {};

    for (let count = 1; count < SPREADSHEET_KEY_FEATURES_COUNT + 1; count++) {
      keyfeaturesImageFields[`keyFeatureImageUrls${count}` as keyof ISpikeArticlesFields] = {
        'ja-JP': await this._uploadAndGetKeyFeatureImageUrl(
          articleRow[SPREADSHEET_ID_HEADER],
          [
            articleRow[`${SPREADSHEET_ARTICLE_IMG_URL_HEADER_PREFIX}${count}_1`],
            articleRow[`${SPREADSHEET_ARTICLE_IMG_URL_HEADER_PREFIX}${count}_2`],
          ],
          count
        ),
      };
    }

    return keyfeaturesImageFields;
  }

  private async _uploadAndGetKeyFeatureImageUrl(
    spikeId: string,
    imageRawUrls: string[],
    keyFeatureNumber: number
  ): Promise<(string | undefined)[]> {
    return await Promise.all(
      imageRawUrls.map(
        async (url, i) =>
          await this._generateUrlAndUploadImage(
            url,
            `${SPREADSHEET_ARTICLE_SHEET_NAME}/${spikeId}/${SPREADSHEET_ARTICLE_IMG_URL_HEADER_PREFIX}${keyFeatureNumber}_${
              i + 1
            }`
          )
      )
    ).then((results: (string | undefined)[]) => results.filter(result => result));
  }

  private _generateStrengthFieldValue(articleRow: GoogleSpreadsheetRow): IShoeStrength[] {
    return [...Array(SPREADSHEET_STRENGTH_COUNT)].flatMap((_, i) =>
      articleRow[`strengthTitle${i + 1}`]
        ? {
            icon: SpreadsheetUploader._getIconClass(articleRow[`strengthIcon${i + 1}`]),
            label: articleRow[`strengthTitle${i + 1}`],
            description: articleRow[`strengthDescription${i + 1}`],
          }
        : []
    );
  }

  private _generateRecommendItemsFieldValue(row: GoogleSpreadsheetRow): any[] {
    return [...Array(SPREADSHEET_RECOMMEND_COUNT)].flatMap((_, i) => {
      const id = row[`recommend${i + 1}`];
      const sysId = this.sysIdMap.get(row[`recommend${i + 1}`]);

      return sysId && id !== row[SPREADSHEET_ID_HEADER]
        ? {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: sysId,
            },
          }
        : [];
    });
  }

  private _generateEventsField(row: GoogleSpreadsheetRow): EventsAndEventCategoriesCode[] {
    return SPREADSHEET_EVENTS_NAMES.flatMap(eventName => {
      if (row[eventName] === '⭕️' || row[eventName] === '◯') {
        switch (eventName) {
          case 'tjpv':
            return [shoeEventsAndEventCategories.tripleJump.id, shoeEventsAndEventCategories.poleVault.id];
          case 'otherThrow':
            return [
              shoeEventsAndEventCategories.hammerThrow.id,
              shoeEventsAndEventCategories.discusThrow.id,
              shoeEventsAndEventCategories.shotPut.id,
            ];
          default:
            return shoeEventsAndEventCategories[eventName as EventCode]?.id || [];
        }
      }

      return [];
    });
  }

  static getlevel(levelLabel: string): AthleteLevelCode | undefined {
    if (!_.isString(levelLabel)) {
      return undefined;
    }

    return Object.values(athleteLevels).find(level => level.label === levelLabel)?.id || undefined;
  }

  static parseYenToInt(yen: string): number | undefined {
    if (!yen || !_.isString(yen)) {
      return undefined;
    }

    const numberText = yen.replace(/,/g, '').replace(/¥/g, '');
    return parseInt(numberText, 10);
  }

  static getShoeLaceType(shoeLaceTypeText: string): string[] | undefined {
    switch (shoeLaceTypeText) {
      case '紐':
        return [shoeLaceTypes.lace.id];
      case 'ベルト':
        return [shoeLaceTypes.belt.id];
      case '両方':
        return [shoeLaceTypes.lace.id, shoeLaceTypes.belt.id];
      default:
        return undefined;
    }
  }

  static getPinType(shoeLaceTypeText: string): string[] | undefined {
    switch (shoeLaceTypeText) {
      case 'fixed':
        return [shoePinTypes.fixed.id];
      case 'removable':
        return [shoePinTypes.removable.id];
      case 'both':
        return [shoePinTypes.fixed.id, shoePinTypes.removable.id];
      default:
        return undefined;
    }
  }

  static _getIconClass(iconName: string): string {
    if (!iconName) {
      return '';
    }

    return icons[iconName as IconName] || '';
  }

  static _reduceImageSize(driveFileBuffer: Buffer) {
    return sharp(driveFileBuffer)
      ?.flatten({ background: '#ffffff' })
      .resize(800, 600)
      .jpeg({ quality: 70 })
      .rotate()
      .toBuffer();
  }
}
