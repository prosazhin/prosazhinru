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
	Links,
	Tabs,
} from '../../components'

import CONTENTFULAPI from '../../api/contentful'
const api = new CONTENTFULAPI()



export async function getStaticPaths() {
	const result = method.tags.serializer(await method.tags.getList())

    const paths = result.map((item) => ({
        params: { tag: item.url },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
	const pages = method.pages.serializer(await method.pages.getList(), 'links')
	const contacts = method.contacts.serializer(await method.contacts.getList())
	const tags = method.tags.serializer(await method.tags.getList())
	const activeTag = tags.filter(item => item.url === params.tag)[0]
	const links = method.links.serializer(await method.links.getListWithTag(activeTag.id))

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
