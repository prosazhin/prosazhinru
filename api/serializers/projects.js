import { checkValue } from '../../utils/Functions'
import { contentSerializer } from './content'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'



export function projects(data) {
    const result = data.items.map(item => {
        return {
            id: checkValue(item.sys.id),
            slug: checkValue(item.fields.slug),
            title: checkValue(item.fields.title),
            tags: checkValue(item.fields.tags),
            cover: checkValue(item.fields.cover.fields.file.url),
            create: checkValue(item.fields.create),
            createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
        }
    })

    return result
}



export function project(data) {
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