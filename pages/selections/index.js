import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { useAppContext } from '../../context'
import Mixpanel from '../../utils/Mixpanel'
import method from '../../api/methods'

import {
	MainWrapper,
	MainContainer,
	Container,
	PageHeadline,
	ClickableTagsList,
	Selections,
	Tabs,
} from '../../components'

import CONTENTFULAPI from '../../api/contentful'
const api = new CONTENTFULAPI()



export async function getStaticProps() {
	const pages = method.pages.serializer(await method.pages.getList(), 'selections')
	const contacts = method.contacts.serializer(await method.contacts.getList())
	const tags = method.tags.serializer(await method.tags.getList())
	const selections = method.selections.serializer(await method.selections.getList())

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
	const context = useAppContext()

	const activeTagsList = []

	selections.forEach(selection => {
		selection.tags.forEach(tag => {
			if (activeTagsList.every(item => item.url !== tag.url)) {
				activeTagsList.push(tag)
			}
		})
	})

	// Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_SELECTIONS_PAGE')

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
						array={context.tabs}
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
