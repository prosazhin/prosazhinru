import React from 'react'
import { useRouter } from 'next/router'

import {
	MainWrapper,
	MainContainer,
	PageHeadline,
	Years,
} from '../components'

import {
	pagesSerializer,
	contactsSerializer,
	jobsSerializer,
	selectionsSerializer,
	postsSerializer,
} from '../utils/Serializers'

import API from '../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pagesResult = pagesSerializer(await api.get('pages'), 'home')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const jobsResult = jobsSerializer(await api.get('jobs'))
	const selectionsResult = selectionsSerializer(await api.get('selections'))
	const postsResult = postsSerializer(await api.get('posts'))

	return {
		props: {
			pageData: pagesResult.page,
			navigationsList: pagesResult.navigations,
			contactsList: contactsResult,
			jobsList: jobsResult,
			selectionsList: selectionsResult,
			postsList: postsResult,
		},
	}
}



export default function HomePage({
	pageData,
	navigationsList,
	contactsList,
	jobsList,
	selectionsList,
	postsList,
}) {
	const router = useRouter()

	const yearsList = [
		{
			title: 2021,
			job: null,
			links: null,
			selections: null,
			posts: null,
		},
		{
			title: 2020,
			job: null,
			links: null,
			selections: null,
			posts: null,
		},
		{
			title: 2019,
			job: null,
			links: null,
			selections: null,
			posts: null,
		},
		{
			title: 2018,
			job: null,
			links: null,
			selections: null,
			posts: null,
		},
		{
			title: 2017,
			job: null,
			links: null,
			selections: null,
			posts: null,
		},
	]

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
				<Years
					array={yearsList}
				/>
			</MainContainer>
		</MainWrapper>
	)
}
