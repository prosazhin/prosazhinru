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
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticProps() {
    const pagesResult = pagesSerializer(await api.get('pages'), 'posts')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const postsResult = postsSerializer(await api.get('posts'))

	return {
		props: {
            pageData: pagesResult.page,
            navigationsList: pagesResult.navigations,
            contactsList: contactsResult,
            postsList: postsResult,
		},
	}
}



export default function PostsPage({
    pageData,
    navigationsList,
    contactsList,
    postsList,
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
                    <Posts
                        array={postsList}
                    />
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
