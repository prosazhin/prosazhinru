import React from 'react'
import { useRouter } from 'next/router'
import Mixpanel from '../../utils/Mixpanel'
import serializer from '../../api/serializer'
import CONTENTFULAPI from '../../api/contentful'
const api = new CONTENTFULAPI()

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Projects,
} from '../../components'



export async function getStaticProps() {
    const pages = serializer.pages(await method.pages.getList(), 'projects')
	const contacts = serializer.contacts(await method.contacts.getList())
	const projects = serializer.projects(await method.projects.getList())

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
