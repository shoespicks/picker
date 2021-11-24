const contentfulManagement = require('contentful-management');

const managementAccessToken =
  process.env.PICKER_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;
const spaceId = process.env.PICKER_CONTENTFUL_SPACE_ID;
const environmentId = process.env.contentfulEnviroment || 'staging';

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: managementAccessToken
  });

  return contentfulClient
    .getSpace(spaceId)
    .then((space) => space.getEnvironment(environmentId));
};
