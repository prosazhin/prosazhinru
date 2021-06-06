import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import { useAppContext } from '../../context'
import Mixpanel from '../../utils/Mixpanel'
import serializer from '../../serializer'
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



export async function getStaticPaths() {
	const result = serializer.tags(await api.get('tags', { order: 'sys.createdAt' }))

    const paths = result.map((item) => ({
        params: { tag: item.url },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
	const pages = serializer.pages(await api.get('pages'), 'links')
	const contacts = serializer.contacts(await api.get('contacts'))
	const tags = serializer.tags(await api.get('tags', { order: 'sys.createdAt' }))
	const activeTag = tags.filter(item => item.url === params.tag)[0]
	const links = serializer.links(await api.get('links', { limit: 500, include: 0, 'fields.tags.sys.id[in]': activeTag.id }))

	return {
		props: {
			page: pages.page,
			navigations: pages.navigations,
			contacts: contacts,
			tags: tags,
			activeTag: activeTag,
			links: links,
		},
	}
}



export default function LinksTagPage({
	page,
	navigations,
	tags,
	activeTag,
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
			canonical="links"
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
