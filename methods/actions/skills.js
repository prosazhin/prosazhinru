import { checkValue } from '../../utils/Functions';
import CONTENTFULAPI from '../contentful';
const api = new CONTENTFULAPI();

export const skills = {
  getList: () => api.get('skills'),

  serializer(data) {
    const result = data.items.map((item) => {
      return {
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        order: checkValue(item.fields.order),
        description: checkValue(item.fields.description),
        tools: checkValue(item.fields.tools),
      };
    });

    return result;
  },
};
