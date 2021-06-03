import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { useAppContext } from '../../context'
import Mixpanel from '../utils/Mixpanel'

import {
	MainWrapper,
	MainContainer,
	Container,
	PageHeadline,
	ClickableTagsList,
	Links,
	Tabs,
} from '../../components'

import {
    getPages,
    getContacts,
    getTags,
    getLinks,
} from '../../api/actions'



export async function getStaticProps() {
	const pages = await getPages('links')
	const contacts = await getContacts()
	const tags = await getTags()
	const links = await getLinks()

	return {
		props: {
			page: pages.page,
			navigations: pages.navigations,
			contacts: contacts,
			tags: tags,
			links: links,
		},
	}
}



export default function LinksPage({
	page,
	navigations,
	tags,
	links,
	contacts,
}) {
	const router = useRouter()
	const context = useAppContext()

	// Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_LINKS_PAGE')

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
						array={tags}
						tagLinkTo="links"
						customClass={style.tags}
					/>
					<Links
						array={links}
						customClass={style.links}
					/>
				</Container>
			</MainContainer>
		</MainWrapper>
	)
}
