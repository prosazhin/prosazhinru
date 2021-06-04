import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { contentSerializer } from '../serializers'



export const projects = {
    getList: () => api.get('projects'),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: item.sys.id,
                slug: item.fields.slug,
                title: item.fields.title,
                tags: item.fields.tags,
                cover: item.fields.cover.fields.file.url,
                create: item.fields.create,
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result
    }
}



export const project = {
    getItem: (slug) => api.get('projects', { 'fields.slug': slug }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: item.sys.id,
                slug: item.fields.slug,
                title: item.fields.title,
                content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
                tags: item.fields.tags,
                create: item.fields.create,
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result[0]
    }
}
