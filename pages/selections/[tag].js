import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { useAppContext } from '../../context'
import Mixpanel from '../../utils/Mixpanel'
import method from '../../methods'

import {
	MainWrapper,
	MainContainer,
	Container,
	PageHeadline,
	ClickableTagsList,
	Selections,
	Tabs,
} from '../../components'



export async function getServerSideProps(context) {
	const pages = method.pages.serializer(await method.pages.getList(), 'selections')
	const contacts = method.contacts.serializer(await method.contacts.getList())
	const tags = method.tags.serializer(await method.tags.getList())
	const activeTag = tags.filter(item => item.url === context.params.tag)[0]
	const selections = method.selections.serializer(await method.selections.getList())
	const activeSelections = method.selections.serializer(await method.selections.getListWithTag(activeTag.id))

	return {
		props: {
			page: pages.page,
			navigations: pages.navigations,
			contacts: contacts,
			tags: tags,
			activeTag: activeTag,
			selections: selections,
			activeSelections: activeSelections,
		},
	}
}



export default function SelectionsTagPage({
	page,
	navigations,
	tags,
	activeTag,
	selections,
	activeSelections,
	contacts,
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
			canonical="selections"
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
						array={activeSelections}
					/>
				</Container>
			</MainContainer>
		</MainWrapper>
	)
}
