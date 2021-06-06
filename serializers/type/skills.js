import { checkValue } from '../../utils/Functions'



export function skills(data) {
    const result = data.items.map(item => {
        return {
            id: checkValue(item.sys.id),
            title: checkValue(item.fields.title),
            order: checkValue(item.fields.order),
            description: checkValue(item.fields.description),
            tools: checkValue(item.fields.tools),
        }
    })

    return result
}
