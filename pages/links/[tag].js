import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
	MainWrapper,
	PageHeadline,
	Tags,
	Links,
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



export default function LinksTagPage({ pageData, navigationsList, tagsList, linksList, contactsList }) {
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
			<Tags
				array={tagsList}
				tagLinkTo="links"
				customClass={style.tags}
				clickable
			/>
			<Links
				array={linksList}
				tags={true}
			/>
		</MainWrapper>
	)
}



export async function getStaticPaths() {
    const tagsResult = tagsSerializer( await api.get({ content_type: 'tags', order: 'sys.createdAt' }) )

    const paths = tagsResult.map((item) => ({
        params: { tag: item.url },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
	const pageResult = pagesSerializer( await api.get({ content_type: 'page', 'fields.slug': 'links' }) )[0]
	const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const tagsResult = tagsSerializer( await api.get({ content_type: 'tags', order: 'sys.createdAt' }) )
	const activeTagId = tagsResult.filter(item => item.url === params.tag)[0].id
	const linksResult = linksSerializer( await api.get({ content_type: 'links', limit: 500, 'fields.tags.sys.id[in]': activeTagId }) )
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