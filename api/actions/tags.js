import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export const tags = {
    getList: () => api.get('tags', { order: 'sys.createdAt' }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                title: checkValue(item.fields.title),
                url: checkValue(item.fields.url),
            }
        })
    
        return result
    }
}
