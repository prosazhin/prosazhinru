import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import {
    competenciesCategoriesSerializer,
} from '../serializers'



export async function getCompetencies() {
    return competenciesCategoriesSerializer(await api.get('competencies-categories'))
}
