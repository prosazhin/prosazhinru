import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



const pages = {
    getList: () => api.get('pages'),

    serializer(data, pageName) {
        const result = {
            page: {},
            navigations: [],
        }
        
        result.navigations = data.items.map(item => {
            if (pageName === item.fields.slug) {
                result.page = {
                    id: checkValue(item.sys.id),
                    title: checkValue(item.fields.pageTitle),
                    description: checkValue(item.fields.pageDescription),
                    metaTitle: checkValue(item.fields.metaTitle),
                    metaDescription: checkValue(item.fields.metaDescription),
                }
            }
    
            return {
                id: checkValue(item.sys.id),
                title: checkValue(item.fields.title),
                slug: checkValue(item.fields.slug),
                show: checkValue(item.fields.show),
                order: checkValue(item.fields.order),
            }
        })
    
        return result
    }
}