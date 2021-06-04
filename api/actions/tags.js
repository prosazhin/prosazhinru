import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export const tags = {
    get: api.get('tags', { order: 'sys.createdAt' }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: item.sys.id,
                title: item.fields.title,
                url: item.fields.url,
            }
        })
    
        return result
    }
}
