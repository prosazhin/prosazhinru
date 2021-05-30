
export function linksSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description,
            url: item.fields.url,
            create: item.fields.create ? item.fields.create : null,
        }
    })

    return result
}
