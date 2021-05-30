
import {
    contactsSerializer,
} from '../../serializers'

import CONTENTFULAPI from '../../contentful'
const api = new CONTENTFULAPI()



export async function getContacts() {
    return contactsSerializer(await api.get('contacts'))
}
