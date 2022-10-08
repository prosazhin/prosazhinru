import { checkValue } from '../../utils/Functions';
import CONTENTFULAPI from '../contentful';
const api = new CONTENTFULAPI();

export const links = {
  getList: () => api.get('links', { limit: 500 }),

  getListWithTag: (activeTagId) => api.get('links', { limit: 500, 'fields.tags.sys.id[in]': activeTagId }),

  serializer(data) {
    const result = data.items.map((item) => {
      return {
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        url: checkValue(item.fields.url),
        create: checkValue(item.fields.create),
        tags: item.fields.tags.map((tag) => {
          return {
            id: checkValue(tag.sys.id),
            title: checkValue(tag.fields.title),
            url: checkValue(tag.fields.url),
          };
        }),
      };
    });

    return result;
  },
};
