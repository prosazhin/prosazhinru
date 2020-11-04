import React from 'react'
import { useRouter } from 'next/router'

import {
	MainWrapper,
	PageHeadline,
	Headline,
	Blog,
	Selections,
	Links,
	Container,
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
	const pageResult = pagesSerializer( await api.get({ content_type: 'page', 'fields.slug': 'home' }) )[0]
	const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const selectionsResult = selectionsSerializer( await api.get({ content_type: 'selections', order: 'sys.createdAt', limit: 1 }) )
	const linksResult = linksSerializer( await api.get({ content_type: 'links', limit: 8 }) )
	const contactsResult = contactsSerializer( await api.get({ content_type: 'contacts', order: 'sys.createdAt' }) )

	return {
		props: {
			pageData: pageResult,
			navigationsList: navigationsResult,
			selectionsList: selectionsResult,
			linksList: linksResult,
			contactsList: contactsResult,
		},
	}
}



export default function HomePage({ pageData, navigationsList, selectionsList, linksList, contactsList }) {
	const router = useRouter()

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-index.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<Container
				small
				center
			>
				<PageHeadline
					title={pageData.title}
					description={pageData.description}
				>
					<Blog />
				</PageHeadline>
			</Container>
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
				tags={true}
				tagLinkTo="links"
			/>
		</MainWrapper>
	)
}
