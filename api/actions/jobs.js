import dayjs from 'dayjs'
import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()

import 'dayjs/locale/ru'



export const jobs = {
    get: api.get('jobs'),

    serializer(data) {
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
                date: `${dayjs(item.fields.recruited).locale('ru').format('MMMM YYYY')} — ${item.fields.dismissal === null ? 'Сейчас' : `${dayjs(item.fields.dismissal).locale('ru').format('MMMM YYYY')}`}`,
            }
        })
    
        return result
    }
}
