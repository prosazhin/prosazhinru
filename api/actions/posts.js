import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import {
    postsSerializer,
    postSerializer,
} from '../serializers'



export async function getPosts() {
    return postsSerializer(await api.get('posts'))
}

export async function getPost(slug) {
    return postSerializer(await api.get('posts', { 'fields.slug': slug }))[0]
}
