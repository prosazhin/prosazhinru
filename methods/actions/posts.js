import { checkValue } from '../../utils/Functions';
import CONTENTFULAPI from '../contentful';
const api = new CONTENTFULAPI();
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { contentSerializer } from '../serializers/content';

export const posts = {
  getList: () => api.get('posts'),

  getListWithTag: (activeTagId) => api.get('posts', { 'fields.tags.sys.id[in]': activeTagId }),

  serializer(data) {
    const result = data.items.map((item) => {
      return {
        id: checkValue(item.sys.id),
        slug: checkValue(item.fields.slug),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
        mediumUrl: checkValue(item.fields.mediumUrl),
      };
    });

    return result;
  },
};

export const post = {
  getItem: (slug) => api.get('posts', { 'fields.slug': slug }),

  serializer(data) {
    const result = data.items.map((item) => {
      return {
        id: checkValue(item.sys.id),
        slug: checkValue(item.fields.slug),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
        mediumUrl: checkValue(item.fields.mediumUrl),
        content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
      };
    });

    return result[0];
  },
};
