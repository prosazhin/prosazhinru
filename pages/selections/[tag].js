import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { useAppContext } from '../../context'
import Mixpanel from '../../utils/Mixpanel'
import serializer from '../../api/serializer'
import CONTENTFULAPI from '../../api/contentful'
const api = new CONTENTFULAPI()

import {
	MainWrapper,
	MainContainer,
	Container,
	PageHeadline,
	ClickableTagsList,
	Selections,
	Tabs,
} from '../../components'



export async function getStaticPaths() {
    const result = serializer.tags(await method.tags.getList())

    const paths = result.map((item) => ({
        params: { tag: item.url },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
	const pages = serializer.pages(await method.pages.getList(), 'selections')
	const contacts = serializer.contacts(await method.contacts.getList())
	const tags = serializer.tags(await method.tags.getList())
	const activeTag = tags.filter(item => item.url === params.tag)[0]
	const selections = serializer.selections(await method.selections.getList())
	const activeSelections = serializer.selections(await method.selections.getListWithTag(activeTag.id))

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
