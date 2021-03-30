
export function pagesSerializer(data, pageName) {
    const result = {
        page: {},
        navigations: [],
    }
    
    result.navigations = data.items.map(item => {
        if (pageName === item.fields.slug) {
            result.page = {
				id: item.sys.id,
				title: item.fields.pageTitle ? item.fields.pageTitle : null,
				description: item.fields.pageDescription ? item.fields.pageDescription : null,
				metaTitle: item.fields.metaTitle,
				metaDescription: item.fields.metaDescription,
			}
        }

        return {
            id: item.sys.id,
            title: item.fields.title,
            slug: item.fields.slug,
            show: item.fields.show,
            order: item.fields.order,
        }
    })

    return result
}



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



export function linksSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description,
            url: item.fields.url,
            create: item.sys.createdAt,
            type: 'link',
        }
    })

    return result
}



export function selectionsSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description,
            create: item.fields.create,
            type: 'selection',
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
                    description: link.fields.description,
                    url: link.fields.url,
                    create: item.sys.createdAt,
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
