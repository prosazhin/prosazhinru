import React from 'react'
import { useRouter } from 'next/router'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Posts,
} from '../../components'

import {
    pagesSerializer,
    contactsSerializer,
    postsSerializer,
} from '../../serializers'

import API from '../api/contentful'
const api = new API()



export async function getStaticProps() {
    const pages = pagesSerializer(await api.get('pages'), 'posts')
	const contacts = contactsSerializer(await api.get('contacts'))
	const posts = postsSerializer(await api.get('posts'))

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
