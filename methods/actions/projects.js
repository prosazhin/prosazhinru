import { checkValue } from '../../utils/Functions';
import CONTENTFULAPI from '../contentful';
const api = new CONTENTFULAPI();
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const projects = {
  getList: () => api.get('projects'),

  getListWithTag: (activeTagId) => api.get('projects', { 'fields.tags.sys.id[in]': activeTagId }),

  serializer(data) {
    const result = data.items.map((item) => {
      return {
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        url: checkValue(item.fields.url),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        cover: checkValue(item.fields.cover),
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
        gitUrl: checkValue(item.fields.gitUrl),
        figmaUrl: checkValue(item.fields.figmaUrl),
        figmaCommunityUrl: checkValue(item.fields.figmaCommunityUrl),
        behanceUrl: checkValue(item.fields.behanceUrl),
        projectUrl: checkValue(item.fields.projectUrl),
      };
    });

    return result;
  },
};
