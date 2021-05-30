
export function contactsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            order: item.fields.order,
            link: item.fields.link,
            url: item.fields.url,
        }
    })

    return result
}
