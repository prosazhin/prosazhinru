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
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pagesResult = pagesSerializer(await api.get('pages'), 'selections')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const tagsResult = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
	const selectionsResult = selectionsSerializer(await api.get('selections'))

	return {
		props: {
			pageData: pagesResult.page,
			navigationsList: pagesResult.navigations,
			contactsList: contactsResult,
			tagsList: tagsResult,
			selectionsList: selectionsResult,
		},
	}
}



export default function SelectionsPage({
	pageData,
	navigationsList,
	tagsList,
	selectionsList,
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
						array={selectionsList}
					/>
				</Container>
			</MainContainer>
		</MainWrapper>
	)
}
