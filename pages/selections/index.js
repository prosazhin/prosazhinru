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



export async function getStaticProps() {
	const pageResult = pagesSerializer(await api.get('page', { 'fields.slug': 'selections' }))[0]
	const navigationsResult = navigationsSerializer(await api.get('navigations'))
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const tagsResult = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
	const selectionsResult = selectionsSerializer(await api.get('selections', { include: 1 }))

	return {
		props: {
			pageData: pageResult,
			navigationsList: navigationsResult,
			contactsList: contactsResult,
			tagsList: tagsResult,
			selectionsList: selectionsResult,
		},
	}
}



export default function SelectionsPage({ pageData, navigationsList, tagsList, selectionsList, contactsList }) {
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
