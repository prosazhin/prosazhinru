import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { dataTabs } from '../../utils/tabs'

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
	pagesSerializer,
	tagsSerializer,
	linksSerializer,
	contactsSerializer,
} from '../../serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pages = pagesSerializer(await api.get('pages'), 'links')
	const contacts = contactsSerializer(await api.get('contacts'))
	const tags = tagsSerializer(await api.get('tags', { order: 'sys.createdAt' }))
	const links = linksSerializer(await api.get('links', { limit: 500, include: 0 }))

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
