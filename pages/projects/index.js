import React from 'react'
import { useRouter } from 'next/router'
import Mixpanel from '../../utils/Mixpanel'
import serializer from '../../serializers'
import CONTENTFULAPI from '../../methods/contentful'
const api = new CONTENTFULAPI()

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Projects,
} from '../../components'



export async function getStaticProps() {
    const pages = serializer.pages(await api.get('pages'), 'projects')
	const contacts = serializer.contacts(await api.get('contacts'))
	const projects = serializer.projects(await api.get('projects'))

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

    // Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_PROJECTS_PAGE')

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
