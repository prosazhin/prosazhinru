import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export const links = {
    getList: () => api.get('links', { limit: 500, include: 0 }),
    getListWithTag: (activeTagId) => api.get('links', { limit: 500, include: 0, 'fields.tags.sys.id[in]': activeTagId }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                title: checkValue(item.fields.title),
                description: checkValue(item.fields.description),
                url: checkValue(item.fields.url),
                create: checkValue(item.fields.create),
            }
        })
    
        return result
    }
}