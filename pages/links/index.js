import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { dataTabs } from '../../utils/Tabs'

import {
	MainWrapper,
	MainContainer,
	Container,
	PageHeadline,
	Tags,
	Links,
	Tabs,
} from '../../components'

import {
	pagesSerializer,
	tagsSerializer,
	linksSerializer,
	contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pagesResult = pagesSerializer(await api.get('pages'), 'links')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const tagsResult = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
	const linksResult = linksSerializer(await api.get('links', { limit: 500, include: 0 }))

	return {
		props: {
			pageData: pagesResult.page,
			navigationsList: pagesResult.navigations,
			contactsList: contactsResult,
			tagsList: tagsResult,
			linksList: linksResult,
		},
	}
}



export default function LinksPage({
	pageData,
	navigationsList,
	tagsList,
	linksList,
	contactsList,
}) {
	const router = useRouter()

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-links.jpg"
			url={router.asPath}
		>
			<MainContainer>
				<Container>
					<Tabs
						array={dataTabs}
						customClass={style.tabs}
					/>
					<PageHeadline
						title={pageData.title}
						description={pageData.description}
					/>
					<Tags
						array={tagsList}
						tagLinkTo="links"
						customClass={style.tags}
						clickable
					/>
					<Links
						array={linksList}
						customClass={style.links}
					/>
				</Container>
			</MainContainer>
		</MainWrapper>
	)
}
