import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export const links = {
    getList: () => api.get('links', { limit: 500, include: 0 }),
    getListWithTag: (activeTagId) => api.get('links', { limit: 500, include: 0, 'fields.tags.sys.id[in]': activeTagId }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: item.sys.id,
                title: item.fields.title,
                description: item.fields.description,
                url: item.fields.url,
                create: item.fields.create ? item.fields.create : null,
            }
        })
    
        return result
    }
}
