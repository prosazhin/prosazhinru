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
    path: '/competencies',
    priority: 0.8,
  },
  {
    path: '/en/competencies',
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
    path: '/links',
    priority: 0.7,
  },
  {
    path: '/links?tag=design',
    priority: 0.7,
  },
  {
    path: '/links?tag=frontend',
    priority: 0.7,
  },
  {
    path: '/links?tag=tooling',
    priority: 0.7,
  },
  {
    path: '/links?tag=figma',
    priority: 0.7,
  },
  {
    path: '/links?tag=dev',
    priority: 0.7,
  },
  {
    path: '/compilations',
    priority: 0.7,
  },
  {
    path: '/compilations?tag=design',
    priority: 0.7,
  },
  {
    path: '/compilations?tag=frontend',
    priority: 0.7,
  },
  {
    path: '/compilations?tag=tooling',
    priority: 0.7,
  },
  {
    path: '/compilations?tag=figma',
    priority: 0.7,
  },
  {
    path: '/compilations?tag=dev',
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
