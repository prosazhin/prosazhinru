import { checkValue } from '../utils/Functions'
import CONTENTFULAPI from './contentful'
const api = new CONTENTFULAPI()
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { contentSerializer } from './serializers/content'



const pages = {
    getList: () => api.get('pages'),

    serializer(data, pageName) {
        const result = {
            page: {},
            navigations: [],
        }
        
        result.navigations = data.items.map(item => {
            if (pageName === item.fields.slug) {
                result.page = {
                    id: checkValue(item.sys.id),
                    title: checkValue(item.fields.pageTitle),
                    description: checkValue(item.fields.pageDescription),
                    metaTitle: checkValue(item.fields.metaTitle),
                    metaDescription: checkValue(item.fields.metaDescription),
                }
            }
    
            return {
                id: checkValue(item.sys.id),
                title: checkValue(item.fields.title),
                slug: checkValue(item.fields.slug),
                show: checkValue(item.fields.show),
                order: checkValue(item.fields.order),
            }
        })
    
        return result
    }
}



const contacts = {
    getList: () => api.get('contacts'),

    serializer(data) {
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
}



const tags = {
    getList: () => api.get('tags', { order: 'sys.createdAt' }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                title: checkValue(item.fields.title),
                url: checkValue(item.fields.url),
            }
        })
    
        return result
    }
}



const links = {
    getList: () => api.get('links', { limit: 500, include: 0 }),
    getListWithTag: (activeTagId) => api.get('links', { limit: 500, include: 0, 'fields.tags.sys.id[in]': activeTagId }),

    serializer(data) {
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
}



const selections = {
    getList: () => api.get('selections'),
    getListWithTag: (activeTagId) => api.get('selections', { 'fields.tags.sys.id[in]': activeTagId }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                title: checkValue(item.fields.title),
                description: checkValue(item.fields.description),
                create: checkValue(item.fields.create),
                tags: item.fields.tags.map(tag => {
                    return {
                        id: checkValue(tag.sys.id),
                        title: checkValue(tag.fields.title),
                        url: checkValue(tag.fields.url),
                    }
                }),
                links: item.fields.links.map(link => {
                    return {
                        id: checkValue(link.sys.id),
                        title: checkValue(link.fields.title),
                        description: checkValue(link.fields.description),
                        url: checkValue(link.fields.url),
                        create: checkValue(item.sys.createdAt),
                    }
                }),
            }
        })
    
        return result
    }
}



const posts = {
    getList: () => api.get('posts'),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                slug: checkValue(item.fields.slug),
                title: checkValue(item.fields.title),
                description: checkValue(item.fields.description),
                tags: checkValue(item.fields.tags),
                create: checkValue(item.fields.create),
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result
    }
}



const post = {
    getItem: (slug) => api.get('posts', { 'fields.slug': slug }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                slug: checkValue(item.fields.slug),
                title: checkValue(item.fields.title),
                description: checkValue(item.fields.description),
                content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
                tags: checkValue(item.fields.tags),
                create: checkValue(item.fields.create),
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result[0]
    }
}



const projects = {
    getList: () => api.get('projects'),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                slug: checkValue(item.fields.slug),
                title: checkValue(item.fields.title),
                tags: checkValue(item.fields.tags),
                cover: checkValue(item.fields.cover.fields.file.url),
                create: checkValue(item.fields.create),
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result
    }
}



const project = {
    getItem: (slug) => api.get('projects', { 'fields.slug': slug }),

    serializer(data) {
        const result = data.items.map(item => {
            return {
                id: checkValue(item.sys.id),
                slug: checkValue(item.fields.slug),
                title: checkValue(item.fields.title),
                content: JSON.parse(JSON.stringify(contentSerializer(item.fields.content.content))),
                tags: checkValue(item.fields.tags),
                create: checkValue(item.fields.create),
                createString: dayjs(item.fields.create).locale('ru').format('DD MMMM YYYY'),
            }
        })
    
        return result[0]
    }
}



const skills = {
    getList: () => api.get('skills'),

    serializer(data) {
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
}



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



const competencies = {
    getList: () => api.get('competencies-categories'),

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



const method = {
    pages,
    contacts,
    tags,
    links,
    selections,
    posts,
    post,
    projects,
    project,
    competencies,
    skills,
    jobs,
}

export default method
