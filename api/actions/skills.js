import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import {
    skillsSerializer,
} from '../serializers'



export async function getSkills() {
    return skillsSerializer(await api.get('skills'))
}
