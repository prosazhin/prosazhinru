import React from 'react'
import { useRouter } from 'next/router'

import {
    MainWrapper,
    MainContainer,
    PageHeadline,
} from '../../components'

import {
    pagesSerializer,
    contactsSerializer,
    postsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticPaths() {
    const postsResult = postsSerializer(await api.get('posts'))

    const paths = postsResult.map((post) => ({
        params: { slug: post.slug },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
    const pagesResult = pagesSerializer(await api.get('pages'), 'posts')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const postResult = postsSerializer(await api.get('posts', { 'fields.slug': params.slug }))[0]

	return {
		props: {
            pageData: pagesResult.page,
            navigationsList: pagesResult.navigations,
            contactsList: contactsResult,
            postData: postResult,
		},
	}
}



export default function PostsPage({
    pageData,
    navigationsList,
    contactsList,
    postData,
}) {
    const router = useRouter()

	return (
        <MainWrapper
            navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-about.jpg"
			url={router.asPath}
		>
            <MainContainer
				small
			>
                <PageHeadline
                    title={postData.title}
                    description={postData.description}
                />
            </MainContainer>
        </MainWrapper>
	)
}
