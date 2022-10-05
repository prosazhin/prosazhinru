module.exports = {
  siteUrl: 'https://prosazhin.ru',
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        host: 'http://prosazhin.ru',
        allow: '/',
        disallow: '/_next',
      },
    ],
    additionalSitemaps: ['https://prosazhin.ru/sitemap.xml'],
  },
};
