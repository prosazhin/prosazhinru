
import {
    selectionsSerializer,
} from '../serializers'

import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export async function getSelections() {
    return selectionsSerializer(await api.get('selections'))
}

export async function getSelectionsWithTag(activeTagId) {
    return selectionsSerializer(await api.get('selections', { 'fields.tags.sys.id[in]': activeTagId }))
}
