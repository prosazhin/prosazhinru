import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { useAppContext } from '../../context'

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
    getPages,
    getContacts,
    getTags,
    getSelections,
} from '../../api/actions'



export async function getStaticProps() {
	const pages = await getPages('selections')
	const contacts = await getContacts()
	const tags = await getTags()
	const selections = await getSelections()

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
