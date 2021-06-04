import { checkValue } from '../../utils/Functions'



export function contacts(data) {
    const result = data.items.map(item => {
        return {
            id: checkValue(item.sys.id),
            title: checkValue(item.fields.title),
            order: checkValue(item.fields.order),
            link: checkValue(item.fields.link),
            url: checkValue(item.fields.url),
        }
    })

    return result
}
