import { checkValue } from '../../utils/Functions';
import CONTENTFULAPI from '../contentful';
const api = new CONTENTFULAPI();

export const selections = {
  getList: () => api.get('selections'),

  getListWithTag: (activeTagId) => api.get('selections', { 'fields.tags.sys.id[in]': activeTagId }),

  serializer(data) {
    const result = data.items.map((item) => {
      return {
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        create: checkValue(item.fields.create),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        links: item.fields.links.map((link) => ({
          id: checkValue(link.sys.id),
          title: checkValue(link.fields.title),
          description: checkValue(link.fields.description),
          url: checkValue(link.fields.url),
          create: checkValue(item.sys.createdAt),
          tags: item.fields.tags.map((tag) => ({
            id: checkValue(tag.sys.id),
            title: checkValue(tag.fields.title),
            url: checkValue(tag.fields.url),
          })),
        })),
      };
    });

    return result;
  },
};
