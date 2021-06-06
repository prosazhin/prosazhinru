import { checkValue } from '../../utils/Functions'
import CONTENTFULAPI from '../contentful'
const api = new CONTENTFULAPI()
import dayjs from 'dayjs'
import 'dayjs/locale/ru'



const jobs = {
    getList: () => api.get('jobs'),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                title: checkValue(item.fields.title),
                link: checkValue(item.fields.link),
                url: checkValue(item.fields.url),
                position: checkValue(item.fields.position),
                description: checkValue(item.fields.description),
                order: checkValue(item.fields.order),
                recruited: checkValue(item.fields.recruited),
                dismissal: checkValue(item.fields.dismissal),
                date: `${dayjs(item.fields.recruited).locale('ru').format('MMMM YYYY')} — ${item.fields.dismissal === null ? 'Сейчас' : `${dayjs(item.fields.dismissal).locale('ru').format('MMMM YYYY')}`}`,
            }
        })
    
        return result
    }
}