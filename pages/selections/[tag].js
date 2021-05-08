import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { dataTabs } from '../../utils/Tabs'

import {
	MainWrapper,
	MainContainer,
	Container,
	PageHeadline,
	ClickableTagsList,
	Selections,
	Tabs,
} from '../../components'

import {
	pagesSerializer,
	tagsSerializer,
	selectionsSerializer,
	contactsSerializer,
} from '../../serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticPaths() {
    const result = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))

    const paths = result.map((item) => ({
        params: { tag: item.url },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
	const pagesResult = pagesSerializer(await api.get('pages'), 'selections')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const tagsResult = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
	const selectionsResult = selectionsSerializer(await api.get('selections'))
	const activeTagId = tagsResult.filter(item => item.url === params.tag)[0].id
	const activeSelectionsResult = selectionsSerializer(await api.get('selections', { 'fields.tags.sys.id[in]': activeTagId }))

	return {
		props: {
			pageData: pagesResult.page,
			navigationsList: pagesResult.navigations,
			contactsList: contactsResult,
			tagsList: tagsResult,
			selectionsList: selectionsResult,
			activeSelectionsList: activeSelectionsResult,
		},
	}
}



export default function SelectionsTagPage({
	pageData,
	navigationsList,
	tagsList,
	selectionsList,
	activeSelectionsList,
	contactsList,
}) {
	const router = useRouter()

	const activeTagsList = []

	selectionsList.forEach(selection => {
		selection.tags.forEach(tag => {
			if (activeTagsList.every(item => item.url !== tag.url)) {
				activeTagsList.push(tag)
			}
		})
	})

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-links.jpg"
			url={router.asPath}
			canonical="selections"
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
					<ClickableTagsList
						array={tagsList.filter(item => activeTagsList.some(tag => item.url === tag.url))}
						tagLinkTo="selections"
						customClass={style.tags}
					/>
					<Selections
						array={activeSelectionsList}
					/>
				</Container>
			</MainContainer>
		</MainWrapper>
	)
}
