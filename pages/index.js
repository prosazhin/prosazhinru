import React from 'react'
import { useRouter } from 'next/router'

import {
	MainWrapper,
	PageHeadline,
	Headline,
	ButtonLink,
	Blog,
	Links,
	Container,
} from '../components'

import {
	pageSerializer,
	navigationsSerializer,
	linksSerializer,
	contactsSerializer,
} from '../utils/Serializers'

import API from '../utils/Api'
const api = new API()



export default function HomePage({ pageData, navigationsList, linksList, contactsList }) {
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
			<Container small>
				<PageHeadline description={pageData.description}>
					<Blog />
				</PageHeadline>
			</Container>
			<Headline title="Последние ссылки" />
			<Links
				array={linksList}
				tags={true}
				tagLinkTo="links"
			/>
			<ButtonLink
				title="Все ссылки"
				url="/links"
				target="_self"
			/>
		</MainWrapper>
	)
}



export async function getStaticProps() {
	const pageResult = pageSerializer( await api.getOne('22ziEi9xaIBiXD6mZ56r21') )
	const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const linksResult = linksSerializer( await api.get({ content_type: 'links', limit: 8, }) )
	const contactsResult = contactsSerializer( await api.get({ content_type: 'contacts', order: 'sys.createdAt' }) )

	return {
		props: {
			pageData: pageResult,
			navigationsList: navigationsResult,
			linksList: linksResult,
			contactsList: contactsResult,
		},
	}
}