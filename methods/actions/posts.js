import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { contentSerializer } from '../serializers/content'



export const posts = {
    getList: () => api.get('posts'),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                slug: checkValue(item.fields.slug),
                title: checkValue(item.fields.title),
                description: checkValue(item.fields.description),
                tags: checkValue(item.fields.tags),
                create: checkValue(item.fields.create),
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result
    }
}



export const post = {
    getItem: (slug) => api.get('posts', { 'fields.slug': slug }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                slug: checkValue(item.fields.slug),
                title: checkValue(item.fields.title),
                description: checkValue(item.fields.description),
                content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
                tags: checkValue(item.fields.tags),
                create: checkValue(item.fields.create),
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result[0]
    }
}