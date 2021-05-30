
export function competenciesCategoriesSerializer(data) {
    const result = data.items.map(item => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            order: item.fields.order,
            competencies: item.fields.competencies.map(competence => {
                return {
                    id: competence.sys.id,
                    title: competence.fields.title,
                    rating: competence.fields.rating,
                    order: competence.fields.order,
                }
            }),
        }
    })

    return result
}
