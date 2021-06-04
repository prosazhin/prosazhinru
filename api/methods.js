api.get('pages')

api.get('contacts')

api.get('tags', { order: 'sys.createdAt' })

api.get('links', { limit: 500, include: 0 })
api.get('links', { limit: 500, include: 0, 'fields.tags.sys.id[in]': activeTagId })

api.get('selections')
api.get('selections', { 'fields.tags.sys.id[in]': activeTagId })

api.get('posts')
api.get('posts', { 'fields.slug': slug })

api.get('projects')
api.get('projects', { 'fields.slug': slug })

api.get('skills')

api.get('jobs')

api.get('competencies-categories')
