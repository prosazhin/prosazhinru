/** @type {import('next-sitemap').IConfig} */

const PROD = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const SITE_URL = PROD ? 'https://prosazhin.ru' : 'http://localhost:8080';

const data = [
  {
    path: '/',
    priority: 1.0,
  },
  {
    path: '/en',
    priority: 1.0,
  },
  {
    path: '/career',
    priority: 0.9,
  },
  {
    path: '/en/career',
    priority: 0.9,
  },
  {
    path: '/designer',
    priority: 0.8,
  },
  {
    path: '/en/designer',
    priority: 0.8,
  },
  {
    path: '/developer',
    priority: 0.8,
  },
  {
    path: '/en/developer',
    priority: 0.8,
  },
  {
    path: '/projects',
    priority: 0.8,
  },
  {
    path: '/en/projects',
    priority: 0.8,
  },
  {
    path: '/posts',
    priority: 0.7,
  },
  {
    path: '/en/posts',
    priority: 0.7,
  },
  {
    path: '/links',
    priority: 0.7,
  },
  {
    path: '/en/links',
    priority: 0.7,
  },
];

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  additionalPaths: async () => {
    const result = [];

    data.forEach((item) => {
      result.push({
        loc: item.path,
        changefreq: 'daily',
        priority: item.priority,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },
};
