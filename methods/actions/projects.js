import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { contentSerializer } from '../serializers/content'



export const projects = {
    getList: () => api.get('projects'),

    serializer(data) {
        const result = data.items.map(item => {
            console.log(item.fields.cover.fields.file.details.image.width)
            return {
                id: checkValue(item.sys.id),
                slug: checkValue(item.fields.slug),
                title: checkValue(item.fields.title),
                tags: checkValue(item.fields.tags),
                cover: {
                    url: checkValue(item.fields.cover.fields.file.url),
                    width: checkValue(item.fields.cover.fields.file.details.image.width),
                    height: checkValue(item.fields.cover.fields.file.details.image.height),
                },
                create: checkValue(item.fields.create),
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
                id: checkValue(item.sys.id),
                slug: checkValue(item.fields.slug),
                title: checkValue(item.fields.title),
                content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
                tags: checkValue(item.fields.tags),
                create: checkValue(item.fields.create),
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result[0]
    }
}