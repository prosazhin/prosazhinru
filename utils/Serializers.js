
export function pageSerializer(data) {
    console.log(data)
    const result = {
        id: data.sys.id,
        title: data.fields.title,
        description: data.fields.description,
        metaTitle: data.fields.metaTitle,
        metaDescription: data.fields.metaDescription,
    }

    return result
}



export function pagesSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description,
            metaTitle: item.fields.metaTitle,
            metaDescription: item.fields.metaDescription,
        }
    })

    return result
}



export function navigationsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            url: item.fields.url,
            show: item.fields.show,
            order: item.fields.order,
        }
    })

    return result
}



export function linksSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description ? item.fields.description : null,
            url: item.fields.url,
            tags: item.fields.tags.map(tag => {
                return {
                    id: tag.sys.id,
                    title: tag.fields.title,
                    url: tag.fields.url,
                }
            }),
        }
    })

    return result
}



export function selectionsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description ? item.fields.description : null,
            url: item.fields.url,
            big: item.fields.big,
            tags: item.fields.tags.map(tag => {
                return {
                    id: tag.sys.id,
                    title: tag.fields.title,
                    url: tag.fields.url,
                }
            }),
            links: item.fields.links.map(link => {
                return {
                    id: link.sys.id,
                    title: link.fields.title,
                    description: link.fields.description ? link.fields.description : null,
                    url: link.fields.url,
                    tags: link.fields.tags.map(tag => {
                        return {
                            id: tag.sys.id,
                        }
                    }),
                }
            }),
        }
    })

    return result
}



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



export function contactsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            url: item.fields.url,
            target: item.fields.target,
            type: item.fields.type,
        }
    })

    return result
}