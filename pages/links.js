import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import Headline from '../components/headline'
import Tags from '../components/tags'
import Link from '../components/link'
import GlobalStyle from '../styles/base.scss'
import style from '../styles/links.scss'

import API from '../api'
const api = new API()



const Links = (props) => {
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
		<React.Fragment>
			<Head
				title={props.page.metaTitle}
				description={props.page.metaDescription}
			/>
			<Header pages={props.pages} />
			<Container main>
				<Headline
                    title={props.page.title}
                    description={props.page.description}
					h1
                />
				<Tags
					tags={props.tags}
					page="links"
				/>
				<div className="links">
					{links.map(link =>
						<Link
							link={link}
							key={link.sys.id}
						/>
					)}
				</div>
			</Container>
			<Footer contacts={props.contacts} />

			<style jsx>{GlobalStyle}</style>
			<style jsx>{style}</style>
		</React.Fragment>
	)
}

Links.getInitialProps = async () => {
	const page = await api.getOne('5qalkcKCw8WrL6O1fRhhJ2')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	const tags = await api.get({ content_type: 'tags', order: 'sys.createdAt' })
	const links = await api.get({ content_type: 'links' })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
		tags: tags.items,
		links: links.items,
	}
}

export default Links