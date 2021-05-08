
export function tagsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            url: item.fields.url,
        }
    })

    return result
}
