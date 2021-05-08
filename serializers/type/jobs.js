
export function jobsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            link: item.fields.link,
            url: item.fields.url ? item.fields.url : null,
            position: item.fields.position,
            description: item.fields.description,
            order: item.fields.order,
            recruited: item.fields.recruited,
            dismissal: item.fields.dismissal ? item.fields.dismissal : null,
        }
    })

    return result
}
