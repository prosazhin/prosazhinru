import { contentSerializer } from './content'

export function projectsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            slug: item.fields.slug,
            title: item.fields.title,
            tags: item.fields.tags,
            create: item.fields.create,
            cover: item.fields.cover.fields.file.url,
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
            tags: item.fields.tags,
            create: item.fields.create,
            content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
        }
    })

    return result
}
