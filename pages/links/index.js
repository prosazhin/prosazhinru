import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
	MainWrapper,
	PageHeadline,
	Tags,
	Links,
	Tabs,
} from '../../components'

import {
	pageSerializer,
	navigationsSerializer,
	tagsSerializer,
	linksSerializer,
	contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export default function LinksPage({ pageData, navigationsList, tagsList, linksList, contactsList }) {
	const [dataLinks, setDataLinks] = useState(linksList)
	const router = useRouter()

	useEffect(() => {
		let dataLinks = [].concat(linksList)

		if (router.query.tag) {
			dataLinks = linksList.filter(link => link.tags.some(tag => tag.url === router.query.tag))
		}

		setDataLinks(dataLinks)
	}, [router.query.tag])

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-links.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<PageHeadline
				title={pageData.title}
				description={pageData.description}
			/>
			<Tabs />
			<Tags
				array={tagsList}
				tagLinkTo="links"
			/>
			<Links
				array={dataLinks}
				tags={true}
				tagLinkTo="links"
			/>
		</MainWrapper>
	)
}



export async function getStaticProps() {
	const pageResult = pageSerializer( await api.getOne('5qalkcKCw8WrL6O1fRhhJ2') )
	const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const tagsResult = tagsSerializer( await api.get({ content_type: 'tags', order: 'sys.createdAt' }) )
	const linksResult = linksSerializer( await api.get({ content_type: 'links', limit: 500 }) )
	const contactsResult = contactsSerializer( await api.get({ content_type: 'contacts', order: 'sys.createdAt' }) )

	return {
		props: {
			pageData: pageResult,
			navigationsList: navigationsResult,
			tagsList: tagsResult,
			linksList: linksResult,
			contactsList: contactsResult,
		},
	}
}