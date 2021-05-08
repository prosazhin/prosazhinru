
export function projectsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            slug: item.fields.slug,
            title: item.fields.title,
            description: item.fields.description,
            tags: item.fields.tags,
            create: item.fields.create,
            cover: item.fields.cover.fields.file.url,
        }
    })

    return result
}
