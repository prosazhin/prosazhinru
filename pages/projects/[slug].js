import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import Mixpanel from '../../utils/Mixpanel'
import serializer from '../../api/serializer'
import CONTENTFULAPI from '../../api/contentful'
const api = new CONTENTFULAPI()

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    StaticTagsList,
    Content,
} from '../../components'



export async function getStaticPaths() {
    const result = serializer.projects(await method.projects.getList())

    const paths = result.map((item) => ({
        params: { slug: item.slug },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
    const pages = serializer.pages(await method.pages.getList(), 'projects')
	const contacts = serializer.contacts(await method.contacts.getList())
	const project = serializer.project(await method.project.getItem(params.slug))

	return {
		props: {
            page: pages.page,
            navigations: pages.navigations,
            contacts: contacts,
            project: project,
		},
	}
}



export default function ProjectPage({
    page,
    navigations,
    contacts,
    project,
}) {
    const router = useRouter()

    // Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_PROJECT_PAGE')

	return (
        <MainWrapper
            navigations={navigations}
			contacts={contacts}
			title={project.title}
			description={page.metaDescription}
			image="/sharing-projects.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <PageHeadline
                        title={project.title}
                    />
                </Container>
                <Content
                    data={project}
                />
                <Container small>
                    <StaticTagsList
                        array={project.tags}
                        customClass={style.tags}
                    />
                    <span className={style.date}>
                        {project.createString}
                    </span>
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
