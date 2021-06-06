import { checkValue } from '../../utils/Functions'



export function links(data) {
    const result = data.items.map(item => {
        return {
            id: checkValue(item.sys.id),
            title: checkValue(item.fields.title),
            description: checkValue(item.fields.description),
            url: checkValue(item.fields.url),
            create: checkValue(item.fields.create),
        }
    })

    return result
}
