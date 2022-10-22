const contentfulManagement = require('contentful-management');
const path = require('path');

(!process.env.PICKER_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || !process.env.PICKER_CONTENTFUL_SPACE_ID) &&
  require('dotenv').config({ path: path.join(process.cwd(), '../.env.local') });

const managementAccessToken = process.env.PICKER_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;
const spaceId = process.env.PICKER_CONTENTFUL_SPACE_ID;
const environmentId = process.env.CONTENTFUL_ENVIROMENT || 'staging';

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: managementAccessToken,
  });

  return contentfulClient.getSpace(spaceId).then(space => space.getEnvironment(environmentId));
};
