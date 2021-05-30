
import {
    pagesSerializer,
} from '../../serializers'

import CONTENTFULAPI from '../../contentful'
const api = new CONTENTFULAPI()



export async function getPages(pageName) {
    return pagesSerializer(await api.get('pages'), pageName)
}
