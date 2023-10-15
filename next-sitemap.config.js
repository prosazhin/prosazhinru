/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://prosazhin.ru',
  generateRobotsTxt: true,
  transform: async (config, path) => {
    let newPath = path;

    if (path.startsWith('/ru')) {
      newPath = path.replace('/ru', '');

      if (path === '/ru') {
        newPath = '/';
      }
    }

    return {
      loc: newPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
