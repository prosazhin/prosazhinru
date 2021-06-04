import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import {
    contactsSerializer,
} from '../serializers'



export async function getContacts() {
    return contactsSerializer(await api.get('contacts'))
}
