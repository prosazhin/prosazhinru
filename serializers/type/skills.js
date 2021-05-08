
export function skillsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            order: item.fields.order,
            description: item.fields.description,
            tools: item.fields.tools ? item.fields.tools : null,
        }
    })

    return result
}
