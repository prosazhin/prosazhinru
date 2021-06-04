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
	Links,
	Tabs,
} from '../../components'



export async function getStaticProps() {
	const pages = serializer.pages(await api.get('pages'), 'links')
	const contacts = serializer.contacts(await api.get('contacts'))
	const tags = serializer.tags(await api.get('tags', { order: 'sys.createdAt' }))
	const links = serializer.links(await api.get('links', { limit: 500, include: 0 }))

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
