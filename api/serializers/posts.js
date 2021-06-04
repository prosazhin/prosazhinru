import { checkValue } from '../../utils/Functions'
import { contentSerializer } from './content'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'



export function posts(data) {
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



export function post(data) {
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
