import React from 'react'
import { useRouter } from 'next/router'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Projects,
} from '../../components'

import {
    getPages,
    getContacts,
    getProjects,
} from '../../api/actions'



export async function getStaticProps() {
    const pages = await getPages('projects')
	const contacts = await getContacts()
	const projects = await getProjects()

	return {
		props: {
            page: pages.page,
            navigations: pages.navigations,
            contacts: contacts,
            projects: projects,
		},
	}
}



export default function ProjectsPage({
    page,
    navigations,
    contacts,
    projects,
}) {
    const router = useRouter()

	return (
        <MainWrapper
            navigations={navigations}
			contacts={contacts}
			title={page.metaTitle}
			description={page.metaDescription}
			image="/sharing-projects.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <PageHeadline
                        title={page.title}
                        description={page.description}
                    />
                    <Projects
                        array={projects}
                    />
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
