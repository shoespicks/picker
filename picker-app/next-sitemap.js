module.exports = {
  siteUrl: 'https://pick-er.com/',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './.next',
  transform: async (config, path) => {
    console.log(path);
    return {
      loc: encodeURI(path), // エンコードしたURLを返す
    };
  },
};
