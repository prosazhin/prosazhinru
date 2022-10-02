import { checkValue } from '../../utils/Functions';
import CONTENTFULAPI from '../contentful';
const api = new CONTENTFULAPI();

export const contacts = {
  getList: () => api.get('contacts'),

  serializer(data) {
    const result = data.items.map((item) => {
      return {
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        order: checkValue(item.fields.order),
        link: checkValue(item.fields.link),
        url: checkValue(item.fields.url),
      };
    });

    return result;
  },
};
