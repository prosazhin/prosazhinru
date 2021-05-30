import { contentSerializer } from './content'

export function postsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            slug: item.fields.slug,
            title: item.fields.title,
            description: item.fields.description,
            tags: item.fields.tags,
            create: item.fields.create,
        }
    })

    return result
}

export function postSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            slug: item.fields.slug,
            title: item.fields.title,
            description: item.fields.description,
            content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
            tags: item.fields.tags,
            create: item.fields.create,
        }
    })

    return result
}
