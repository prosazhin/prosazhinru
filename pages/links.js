import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '../styles/pages/links.module.scss'

import {
	Wrapper,
	Headline,
	Tags,
	Link,
	Tabs,
} from '../components'

import API from '../api'
const api = new API()



function Links(props) {
	const [links, setLinks] = useState(props.links)
	const router = useRouter()

	useEffect(() => {
		let dataLinks = [].concat(props.links)

		if (router.query.tag) {
			dataLinks = props.links.filter(link => link.fields.tags.some(tag => tag.fields.url === router.query.tag))
		}

		setLinks(dataLinks)
	}, [router.query.tag])

	return (
		<Wrapper
			pages={props.pages}
			navigations={props.navigations}
			contacts={props.contacts}
			title={props.page.metaTitle}
			description={props.page.metaDescription}
			image="/sharing-links.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<Headline
				title={props.page.title}
				description={props.page.description}
				h1
			/>
			<Tabs />
			<Tags
				tags={props.tags}
				page="links"
			/>
			<div className={style.links}>
				{links.map(link =>
					<Link
						link={link}
						key={link.sys.id}
						tags
					/>
				)}
			</div>
		</Wrapper>
	)
}



Links.getInitialProps = async () => {
	const page = await api.getOne('5qalkcKCw8WrL6O1fRhhJ2')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const navigations = await api.get({ content_type: 'navigations' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	const tags = await api.get({ content_type: 'tags', order: 'sys.createdAt' })
	const links = await api.get({ content_type: 'links', limit: 500 })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
		tags: tags.items,
		links: links.items,
		navigations: navigations.items,
	}
}

export default Links