import React from 'react'
import { useRouter } from 'next/router'

import {
	MainWrapper,
	PageHeadline,
	Headline,
	Selections,
	Links,
} from '../components'

import {
	pagesSerializer,
	navigationsSerializer,
	selectionsSerializer,
	linksSerializer,
	contactsSerializer,
} from '../utils/Serializers'

import API from '../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pageResult = pagesSerializer(await api.get('page', { 'fields.slug': 'home' }))[0]
	const navigationsResult = navigationsSerializer(await api.get('navigations'))
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const selectionsResult = selectionsSerializer(await api.get('selections', { limit: 1, include: 1 }))
	const linksResult = linksSerializer(await api.get('links', { limit: 10, include: 0 }))

	return {
		props: {
			pageData: pageResult,
			navigationsList: navigationsResult,
			contactsList: contactsResult,
			selectionsList: selectionsResult,
			linksList: linksResult,
		},
	}
}



export default function HomePage({ pageData, navigationsList, selectionsList, linksList, contactsList }) {
	const router = useRouter()

	const data = [
		{
			year: '2020',
			data: [],
		},
		{
			year: '2019',
			data: [],
		},
		{
			year: '2018',
			data: [],
		},
	]

	// {data.map(item =>
	// 	<Headline
	// 		title={item.year}
	// 	/>
	// )}

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-index.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<PageHeadline
				description={pageData.description}
			/>
			<Headline
				title="Новая подборка"
			/>
			<Selections
				array={selectionsList}
				isShowTags={true}
			/>
			<Headline
				title="Новые ссылки"
			/>
			<Links
				array={linksList}
			/>
		</MainWrapper>
	)
}
