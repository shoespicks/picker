const contentful = require('contentful');

export const contentfulClient = contentful.createClient({
  space: process.env.PICKER_CONTENTFUL_SPACE_ID,
  accessToken: process.env.PICKER_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.contentfulEnviroment || 'staging'
});
