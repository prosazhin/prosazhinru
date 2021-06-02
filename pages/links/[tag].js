import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

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
    getLinksWithTag,
} from '../../api/actions'



export async function getStaticPaths() {
	const result = await getTags()

    const paths = result.map((item) => ({
        params: { tag: item.url },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
	const pages = await getPages('links')
	const contacts = await getContacts()
	const tags = await getTags()
	const links = await getLinksWithTag(tags.filter(item => item.url === params.tag)[0].id)

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



export default function LinksTagPage({
	page,
	navigations,
	tags,
	links,
	contacts,
}) {
	const router = useRouter()

	const dataTabs = [
		{
			title: 'Ссылки',
			url: '/links',
		},
		{
			title: 'Подборки',
			url: '/selections',
		},
	]

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
