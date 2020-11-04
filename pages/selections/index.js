import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
	MainWrapper,
	PageHeadline,
	Tags,
	Selections,
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
	const pageResult = pagesSerializer( await api.get({ content_type: 'page', 'fields.slug': 'selections' }) )[0]
	const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const tagsResult = tagsSerializer( await api.get({ content_type: 'tags', order: 'sys.createdAt' }) )
	const selectionsResult = selectionsSerializer( await api.get({ content_type: 'selections', order: 'sys.createdAt' }) )
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
