
import {
    projectsSerializer,
    projectSerializer,
} from '../../serializers'

import CONTENTFULAPI from '../../contentful'
const api = new CONTENTFULAPI()



export async function getProjects() {
    return projectsSerializer(await api.get('projects'))
}

export async function getProject(slug) {
    return projectSerializer(await api.get('projects', { 'fields.slug': slug }))[0]
}
