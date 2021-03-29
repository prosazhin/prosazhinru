import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { dataTabs } from '../../utils/Tabs'

import {
	MainWrapper,
	MainContainer,
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



export async function getStaticPaths() {
	const tagsResult = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))

    const paths = tagsResult.map((item) => ({
        params: { tag: item.url },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
	const pagesResult = pagesSerializer(await api.get('pages'), 'links')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const tagsResult = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
	const activeTagId = tagsResult.filter(item => item.url === params.tag)[0].id
	const linksResult = linksSerializer(await api.get('links', { limit: 500, include: 0, 'fields.tags.sys.id[in]': activeTagId }))

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



export default function LinksTagPage({
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
			canonical="links"
		>
			<MainContainer>
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
			</MainContainer>
		</MainWrapper>
	)
}
