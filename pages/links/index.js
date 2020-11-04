import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { dataTabs } from '../../utils/Tabs'

import {
	MainWrapper,
	PageHeadline,
	Tags,
	Links,
	Tabs,
} from '../../components'

import {
	pagesSerializer,
	navigationsSerializer,
	tagsSerializer,
	linksSerializer,
	contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pageResult = pagesSerializer( await api.get({ content_type: 'page', 'fields.slug': 'links' }) )[0]
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



export default function LinksPage({ pageData, navigationsList, tagsList, linksList, contactsList }) {
	const router = useRouter()

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
			<Tabs
				array={dataTabs}
				customClass={style.tabs}
			/>
			<Tags
				array={tagsList}
				tagLinkTo="links"
				customClass={style.tags}
				clickable
			/>
			<Links
				array={linksList}
				isShowTags={true}
			/>
		</MainWrapper>
	)
}
