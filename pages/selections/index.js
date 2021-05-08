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



export async function getStaticProps() {
	const pages = pagesSerializer(await api.get('pages'), 'selections')
	const contacts = contactsSerializer(await api.get('contacts'))
	const tags = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
	const selections = selectionsSerializer(await api.get('selections'))

	return {
		props: {
			page: pages.page,
			navigations: pages.navigations,
			contacts: contacts,
			tags: tags,
			selections: selections,
		},
	}
}



export default function SelectionsPage({
	page,
	navigations,
	contacts,
	tags,
	selections,
}) {
	const router = useRouter()

	const activeTagsList = []

	selections.forEach(selection => {
		selection.tags.forEach(tag => {
			if (activeTagsList.every(item => item.url !== tag.url)) {
				activeTagsList.push(tag)
			}
		})
	})

	return (
		<MainWrapper
			navigations={navigations}
			contacts={contacts}
			title={page.metaTitle}
			description={page.metaDescription}
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
						title={page.title}
						description={page.description}
					/>
					<ClickableTagsList
						array={tags.filter(item => activeTagsList.some(tag => item.url === tag.url))}
						tagLinkTo="selections"
						customClass={style.tags}
					/>
					<Selections
						array={selections}
					/>
				</Container>
			</MainContainer>
		</MainWrapper>
	)
}
