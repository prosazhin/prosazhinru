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
    pagesSerializer,
    contactsSerializer,
    projectsSerializer,
} from '../../serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticProps() {
    const pagesResult = pagesSerializer(await api.get('pages'), 'projects')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const projectsResult = projectsSerializer(await api.get('projects'))

	return {
		props: {
            pageData: pagesResult.page,
            navigationsList: pagesResult.navigations,
            contactsList: contactsResult,
            projectsList: projectsResult,
		},
	}
}



export default function ProjectsPage({
    pageData,
    navigationsList,
    contactsList,
    projectsList,
}) {
    const router = useRouter()

	return (
        <MainWrapper
            navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-posts.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <PageHeadline
                        title={pageData.title}
                        description={pageData.description}
                    />
                    <Projects
                        array={projectsList}
                    />
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
