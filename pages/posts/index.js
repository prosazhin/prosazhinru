import React from 'react'
import { useRouter } from 'next/router'
import Mixpanel from '../../utils/Mixpanel'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Posts,
} from '../../components'

import {
    getPages,
    getContacts,
    getPosts,
} from '../../api/actions'



export async function getStaticProps() {
    const pages = await getPages('posts')
	const contacts = await getContacts()
	const posts = await getPosts()

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
