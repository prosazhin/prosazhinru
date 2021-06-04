import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



// export async function getSelections() {
//     return selectionsSerializer(await api.get('selections'))
// }

// export async function getSelectionsWithTag(activeTagId) {
//     return selectionsSerializer(await api.get('selections', { 'fields.tags.sys.id[in]': activeTagId }))
// }

export const selections = {
    get: api.get('selections'),
    // get: api.get('selections', { 'fields.tags.sys.id[in]': activeTagId }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: item.sys.id,
                title: item.fields.title,
                description: item.fields.description,
                create: item.fields.create,
                tags: item.fields.tags.map(tag => {
                    return {
                        id: tag.sys.id,
                        title: tag.fields.title,
                        url: tag.fields.url,
                    }
                }),
                links: item.fields.links.map(link => {
                    return {
                        id: link.sys.id,
                        title: link.fields.title,
                        description: link.fields.description,
                        url: link.fields.url,
                        create: item.sys.createdAt,
                    }
                }),
            }
        })
    
        return result
    }
}
