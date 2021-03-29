import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
    MainWrapper,
    MainContainer,
    PageHeadline,
} from '../../components'

import {
    pagesSerializer,
    contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticProps() {
    const pagesResult = pagesSerializer(await api.get('pages'), 'posts')
	const contactsResult = contactsSerializer(await api.get('contacts'))

	return {
		props: {
            pageData: pagesResult.page,
            navigationsList: pagesResult.navigations,
            contactsList: contactsResult,
		},
	}
}



export default function PostsPage({
    pageData,
    navigationsList,
    contactsList,
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
                    title={pageData.title}
                    description={pageData.description}
                />
            </MainContainer>
        </MainWrapper>
	)
}
