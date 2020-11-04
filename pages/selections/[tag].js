import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { dataTabs } from '../../utils/Tabs'

import {
	MainWrapper,
	PageHeadline,
	Tags,
	Selections,
	Tabs,
} from '../../components'

import {
	pagesSerializer,
	navigationsSerializer,
	tagsSerializer,
	selectionsSerializer,
	contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



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
	const pageResult = pagesSerializer( await api.get({ content_type: 'page', 'fields.slug': 'selections' }) )[0]
	const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const tagsResult = tagsSerializer( await api.get({ content_type: 'tags', order: 'sys.createdAt' }) )
	const activeTagId = tagsResult.filter(item => item.url === params.tag)[0].id
	const selectionsResult = selectionsSerializer( await api.get({ content_type: 'selections', order: 'sys.createdAt', 'fields.tags.sys.id[in]': activeTagId }) )
	const contactsResult = contactsSerializer( await api.get({ content_type: 'contacts', order: 'sys.createdAt' }) )

	return {
		props: {
			pageData: pageResult,
			navigationsList: navigationsResult,
			tagsList: tagsResult,
			selectionsList: selectionsResult,
			contactsList: contactsResult,
		},
	}
}



export default function SelectionsTagPage({ pageData, navigationsList, tagsList, selectionsList, contactsList }) {
	const router = useRouter()

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-selections.jpg"
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
				tagLinkTo="selections"
				customClass={style.tags}
				clickable
			/>
			<Selections
				array={selectionsList}
				isShowTags={true}
			/>
		</MainWrapper>
	)
}
