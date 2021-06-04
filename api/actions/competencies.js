import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()



export const competencies = {
    get: api.get('competencies-categories'),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                title: checkValue(item.fields.title),
                order: checkValue(item.fields.order),
                competencies: item.fields.competencies.map(competence => {
                    return {
                        id: checkValue(competence.sys.id),
                        title: checkValue(competence.fields.title),
                        rating: checkValue(competence.fields.rating),
                        order: checkValue(competence.fields.order),
                    }
                }),
            }
        })
    
        return result
    }
}