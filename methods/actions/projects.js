import { checkValue } from '../../utils/Functions';
import CONTENTFULAPI from '../contentful';
const api = new CONTENTFULAPI();
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { contentSerializer } from '../serializers/content';

export const projects = {
  getList: () => api.get('projects'),

  serializer(data) {
    const result = data.items.map((item) => {
      return {
        id: checkValue(item.sys.id),
        slug: checkValue(item.fields.slug),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        tags: checkValue(item.fields.tags),
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
        projectUrl: checkValue(item.fields.projectUrl),
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
        tags: checkValue(item.fields.tags),
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
        gitUrl: checkValue(item.fields.gitUrl),
        figmaUrl: checkValue(item.fields.figmaUrl),
        projectUrl: checkValue(item.fields.projectUrl),
        content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
        designContent: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.designContent))),
        devContent: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.devContent))),
      };
    });

    return result[0];
  },
};
