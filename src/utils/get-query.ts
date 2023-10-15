import { AnyObjectType, LinksType } from '@/types';

const PROD = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const SITE_URL = PROD ? 'https://prosazhin.ru' : 'http://localhost:8080';

const getQuery = (type: LinksType, search?: string | null, activeTag?: string | null) => {
  const url = new URL(`/${type}`, SITE_URL);

  const newParams = [
    {
      name: 'tag',
      value: activeTag,
    },
    {
      name: 'query',
      value: search,
    },
  ];

  const getQueryString = (data: AnyObjectType[]) => {
    const params = new URLSearchParams(url.search);

    data.forEach((item: AnyObjectType) => {
      if (item.value) {
        params.set(item.name, item.value);
      }
      if (!item.value) {
        params.delete(item.name);
      }
    });

    return params.toString();
  };

  const getUrlString = () => {
    let result = url.pathname;
    const queryString = getQueryString(newParams);

    if (queryString.length) {
      result += `?${queryString}`;
    }

    return result;
  };

  return getUrlString();
};

export default getQuery;
