import React from 'react'
import { useRouter } from 'next/router'
import Mixpanel from '../../utils/Mixpanel'
import method from '../../api/methods'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Posts,
} from '../../components'

import CONTENTFULAPI from '../../api/contentful'
const api = new CONTENTFULAPI()



export async function getStaticProps() {
    const pages = method.pages.serializer(await method.pages.getList(), 'posts')
	const contacts = method.contacts.serializer(await method.contacts.getList())
	const posts = method.posts.serializer(await method.posts.getList())

	return {
		props: {
            page: pages.page,
            navigations: pages.navigations,
            contacts: contacts,
            posts: posts,
		},
	}
}



export default function PostsPage({
    page,
    navigations,
    contacts,
    posts,
}) {
    const router = useRouter()

    // Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_POSTS_PAGE')

	return (
        <MainWrapper
            navigations={navigations}
			contacts={contacts}
			title={page.metaTitle}
			description={page.metaDescription}
			image="/sharing-posts.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <PageHeadline
                        title={page.title}
                        description={page.description}
                    />
                    <Posts
                        array={posts}
                    />
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
