
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { contentSerializer } from './content'



export function projectsSerializer(data) {
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



export function projectSerializer(data) {
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

    return result
}
