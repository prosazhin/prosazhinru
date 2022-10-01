import { getServerSideSitemap } from 'next-sitemap';

export async function getServerSideProps(context) {
  const fields = [
    {
      loc: 'https://prosazhin.ru',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: 'https://prosazhin.ru/links',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: 'https://prosazhin.ru/selections',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: 'https://prosazhin.ru/projects',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: 'https://prosazhin.ru/posts',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: 'https://prosazhin.ru/about',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: 'https://prosazhin.ru/competencies',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: 'https://prosazhin.ru/jobs',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
  ];

  return getServerSideSitemap(context, fields);
}

const Sitemap = () => <div />;
export default Sitemap;
