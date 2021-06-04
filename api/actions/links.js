import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import {
    linksSerializer,
} from '../serializers'



export async function getLinks() {
    return linksSerializer(await api.get('links', { limit: 500, include: 0 }))
}

export async function getLinksWithTag(activeTagId) {
    return linksSerializer(await api.get('links', { limit: 500, include: 0, 'fields.tags.sys.id[in]': activeTagId }))
}
