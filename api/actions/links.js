
import {
    linksSerializer,
} from '../serializers'

import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export async function getLinks() {
    return linksSerializer(await api.get('links', { limit: 500, include: 0 }))
}

export async function getLinksWithTag(activeTagId) {
    return linksSerializer(await api.get('links', { limit: 500, include: 0, 'fields.tags.sys.id[in]': activeTagId }))
}
