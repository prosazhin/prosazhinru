
import {
    competenciesCategoriesSerializer,
} from '../../serializers'

import CONTENTFULAPI from '../../contentful'
const api = new CONTENTFULAPI()



export async function getCompetencies() {
    return competenciesCategoriesSerializer(await api.get('competencies-categories'))
}
