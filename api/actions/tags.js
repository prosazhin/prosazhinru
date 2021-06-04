import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import {
    tagsSerializer,
} from '../serializers'



export async function getTags() {
    return tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
}
