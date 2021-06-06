import React from 'react'
import { useRouter } from 'next/router'
import Mixpanel from '../../utils/Mixpanel'
import serializer from '../../serializer'
import CONTENTFULAPI from '../../methods/contentful'
const api = new CONTENTFULAPI()

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Posts,
} from '../../components'



export async function getStaticProps() {
    const pages = serializer.pages(await api.get('pages'), 'posts')
	const contacts = serializer.contacts(await api.get('contacts'))
	const posts = serializer.posts(await api.get('posts'))

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
