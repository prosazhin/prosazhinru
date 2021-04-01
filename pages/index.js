import React from 'react'
import { useRouter } from 'next/router'

import {
	MainWrapper,
	MainContainer,
	PageHeadline,
} from '../components'

import {
	pagesSerializer,
	contactsSerializer,
} from '../utils/Serializers'

import API from '../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pagesResult = pagesSerializer(await api.get('pages'), 'home')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const selectionsResult = selectionsSerializer(await api.get('selections'))
	const postsResult = postsSerializer(await api.get('posts'))

	return {
		props: {
			pageData: pagesResult.page,
			navigationsList: pagesResult.navigations,
			contactsList: contactsResult,
			selectionsList: selectionsResult,
			postsList: postsResult,
		},
	}
}



export default function HomePage({
	pageData,
	navigationsList,
	contactsList,
	selectionsList,
	postsList,
}) {
	const router = useRouter()

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-index.jpg"
			url={router.asPath}
		>
			<MainContainer
				small
			>
				<PageHeadline
					description={pageData.description}
				/>
			</MainContainer>
		</MainWrapper>
	)
}
