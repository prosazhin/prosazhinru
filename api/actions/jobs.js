
import {
    jobsSerializer,
} from '../serializers'

import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export async function getJobs() {
    return jobsSerializer(await api.get('jobs'))
}
