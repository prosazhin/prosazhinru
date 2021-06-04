import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import {
    postsSerializer,
    postSerializer,
    contentSerializer,
} from '../serializers'



export const posts = {
    getList: () => api.get('posts'),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: item.sys.id,
                slug: item.fields.slug,
                title: item.fields.title,
                description: item.fields.description,
                tags: item.fields.tags,
                create: item.fields.create,
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result
    }
}

// export async function getPosts() {
//     return postsSerializer(await api.get('posts'))
// }

// export async function getPost(slug) {
//     return postSerializer(await api.get('posts', { 'fields.slug': slug }))[0]
// }

// export const post = {
//     get: api.get('posts', { 'fields.slug': slug }))[0],

//     serializer(data) {
//         const result = data.items.map(item => {
//             return {
//                 id: item.sys.id,
//                 slug: item.fields.slug,
//                 title: item.fields.title,
//                 description: item.fields.description,
//                 content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
//                 tags: item.fields.tags,
//                 create: item.fields.create,
//                 createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
//             }
//         })
    
//         return result
//     }
// }
