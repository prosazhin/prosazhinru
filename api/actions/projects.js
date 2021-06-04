import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import {
    projectsSerializer,
    projectSerializer,
} from '../serializers'



export async function getProjects() {
    return projectsSerializer(await api.get('projects'))
}

export async function getProject(slug) {
    return projectSerializer(await api.get('projects', { 'fields.slug': slug }))[0]
}
