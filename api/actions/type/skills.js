
import {
    skillsSerializer,
} from '../../serializers'

import CONTENTFULAPI from '../../contentful'
const api = new CONTENTFULAPI()



export async function getSkills() {
    return skillsSerializer(await api.get('skills'))
}
