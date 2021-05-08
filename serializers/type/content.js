
export function contentSerializer(data) {
    const result = data.map(item => {
        switch(item.nodeType) {
            case 'embedded-asset-block':
                return {
                    type: 'image',
                    url: item.data.target.fields.file.url,
                    description: item.data.target.fields.description,
                }

            case 'heading-1':
                return {
                    type: 'heading',
                    value: item.content[0].value,
                }

            case 'paragraph':
                if (!item.content[0].value.length) {
                    return { type: 'empty' }
                }
                if (!!item.content[0].marks.length && item.content[0].marks[0].type === 'code') {
                    return {
                        type: 'code',
                        value: item.content[0].value,
                    }
                }
                return {
                    type: 'paragraph',
                    value: item.content[0].value,
                }

            case 'blockquote':
                return {
                    type: 'blockquote',
                    value: item.content.map(valueItem => valueItem.content[0].value),
                }

            case 'ordered-list':
                return {
                    type: 'ordered-list',
                    value: item.content.map(valueItem => valueItem.content[0].content[0].value),
                }

            case 'unordered-list':
                return {
                    type: 'unordered-list',
                    value: item.content.map(valueItem => valueItem.content[0].content[0].value),
                }
        }
    })

    return result.filter(item => item.type !== 'empty')
}
