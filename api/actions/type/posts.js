
import {
    postsSerializer,
    postSerializer,
} from '../../serializers'

import CONTENTFULAPI from '../../contentful'
const api = new CONTENTFULAPI()



export async function getPosts() {
    return postsSerializer(await api.get('posts'))
}

export async function getPost(slug) {
    return postSerializer(await api.get('posts', { 'fields.slug': slug }))[0]
}
