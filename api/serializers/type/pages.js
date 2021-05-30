
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
