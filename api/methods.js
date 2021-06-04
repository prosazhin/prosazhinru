import { getPages } from './actions/pages'
import { getContacts } from './actions/contacts'
import { getTags } from './actions/tags'
import { getLinks, getLinksWithTag } from './actions/links'
import { getSelections, getSelectionsWithTag } from './actions/selections'
import { getPosts, getPost } from './actions/posts'
import { getProjects, getProject } from './actions/projects'
import { getCompetencies } from './actions/competencies'
import { getSkills } from './actions/skills'
import { getJobs } from './actions/jobs'



const method = {
    getPages,
    getContacts,
    getTags,
    getLinks,
    getLinksWithTag,
    getSelections,
    getSelectionsWithTag,
    getPosts,
    getPost,
    getProjects,
    getProject,
    getCompetencies,
    getSkills,
    getJobs,
}

export default method
