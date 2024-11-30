import { getFormatDate } from '@/utils/formatter';

import CONTENTFULAPI from '@/lib/contentful';

const api = new CONTENTFULAPI();

const checkValue = (value) => (value ? value : null);

const getObject = (value, checkArray, lang) => {
  const result = checkArray.reduce((acc, cur) => {
    let keyValue = checkValue(value.fields[cur]);

    if (cur === 'id') keyValue = checkValue(value.sys.id);
    if (cur === 'createString') keyValue = getFormatDate(value.fields.create, lang);

    return {
      ...acc,
      [cur]: keyValue,
    };
  }, {});

  return result;
};

export const matrixMethods = {
  getOne: async (type, lang) =>
    await api.get('matrix', { locale: lang }).then((response) => {
      const matrix = response.items.filter((item) => item.fields.type === type)[0];

      const result = {
        ...getObject(matrix, ['id', 'type'], lang),
        category: matrix.fields.category
          ? matrix.fields.category.map((category) => ({
              ...getObject(category, ['id', 'title'], lang),
              competencies: category.fields.competencies
                ? category.fields.competencies.map((competence) =>
                    getObject(competence, ['id', 'title', 'rating'], lang)
                  )
                : [],
            }))
          : [],
      };

      return result;
    }),
};

export const tagsMethods = {
  getList: async (lang) =>
    await api
      .get('tags', { order: 'sys.createdAt', locale: lang })
      .then((response) =>
        response.items.map((item) => getObject(item, ['id', 'title', 'url'], lang))
      ),
};

export const linksMethods = {
  getList: async (lang) =>
    await api.get('links', { limit: 500, locale: lang }).then((response) =>
      response.items.map((item) => ({
        ...getObject(item, ['id', 'title', 'description', 'url', 'create'], lang),
        tags: item.fields.tags.map((tag) => getObject(tag, ['id', 'title', 'url'], lang)),
      }))
    ),
};

export const compilationsMethods = {
  getList: async (lang) =>
    await api.get('selections', { locale: lang }).then((response) =>
      response.items.map((item) => ({
        ...getObject(item, ['id', 'title', 'description', 'create'], lang),
        tags: item.fields.tags.map((tag) => getObject(tag, ['id', 'title', 'url'], lang)),
        links: item.fields.links.map((link) => ({
          ...getObject(link, ['id', 'title', 'description', 'url', 'create'], lang),
          tags: item.fields.tags.map((tag) => getObject(tag, ['id', 'title', 'url'], lang)),
        })),
      }))
    ),
};

export const postsMethods = {
  getList: async (lang) =>
    await api.get('posts', { locale: lang }).then((response) =>
      response.items.map((item) => ({
        ...getObject(item, ['id', 'url', 'title', 'description', 'create', 'createString'], lang),
        tags: item.fields.tags.map((tag) => getObject(tag, ['id', 'title', 'url'], lang)),
      }))
    ),
};

export const projectsMethods = {
  getList: async (lang) =>
    await api.get('projects', { locale: lang }).then((response) =>
      response.items.map((item) => ({
        ...getObject(
          item,
          ['id', 'title', 'description', 'order', 'size', 'accent', 'first'],
          lang
        ),
        tags: item.fields.tags.map((tag) => getObject(tag, ['id', 'title', 'url'], lang)),
        resourceLinks: item.fields.resourceLinks.map((link) =>
          getObject(link, ['id', 'title', 'url'], lang)
        ),
      }))
    ),
};
