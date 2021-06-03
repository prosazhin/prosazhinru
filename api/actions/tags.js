
import {
    tagsSerializer,
} from '../serializers'

import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export async function getTags() {
    return tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
}
