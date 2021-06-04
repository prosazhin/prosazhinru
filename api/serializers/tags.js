import { checkValue } from '../../utils/Functions'



export function tags(data) {
    const result = data.items.map(item => {
        return {
            id: checkValue(item.sys.id),
            title: checkValue(item.fields.title),
            url: checkValue(item.fields.url),
        }
    })

    return result
}
