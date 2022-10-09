import { checkValue } from '../../utils/Functions';
import CONTENTFULAPI from '../contentful';
const api = new CONTENTFULAPI();
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { contentSerializer } from '../serializers/content';

export const projects = {
  getList: () => api.get('projects'),

  getListWithTag: (activeTagId) => api.get('projects', { 'fields.tags.sys.id[in]': activeTagId }),

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
        cover: checkValue(item.fields.cover)
          ? {
              url: checkValue(item.fields.cover.fields.file.url),
              width: checkValue(item.fields.cover.fields.file.details.image.width),
              height: checkValue(item.fields.cover.fields.file.details.image.height),
            }
          : null,
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
        gitUrl: checkValue(item.fields.gitUrl),
        figmaUrl: checkValue(item.fields.figmaUrl),
        behanceUrl: checkValue(item.fields.behanceUrl),
        projectUrl: checkValue(item.fields.projectUrl),
        show: checkValue(item.fields.show),
      };
    });

    return result;
  },
};

export const project = {
  getItem: (slug) => api.get('projects', { 'fields.slug': slug }),

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
        gitUrl: checkValue(item.fields.gitUrl),
        figmaUrl: checkValue(item.fields.figmaUrl),
        behanceUrl: checkValue(item.fields.behanceUrl),
        projectUrl: checkValue(item.fields.projectUrl),
        designContent: checkValue(item.fields.designContent) ? JSON.parse(JSON.stringify(contentSerializer(item.fields.designContent.content))) : null,
        devContent: checkValue(item.fields.devContent) ? JSON.parse(JSON.stringify(contentSerializer(item.fields.devContent.content))) : null,
        show: checkValue(item.fields.show),
      };
    });

    return result[0];
  },
};
