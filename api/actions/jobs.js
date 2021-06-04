import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import {
    jobsSerializer,
} from '../serializers'



export async function getJobs() {
    return jobsSerializer(await api.get('jobs'))
}
