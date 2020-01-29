import React from 'react'
import { useRouter } from 'next/router'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import Headline from '../components/headline'
import Tags from '../components/tags'
import Tabs from '../components/tabs'
import GlobalStyle from '../styles/base.scss'

import API from '../api'
const api = new API()



const Selections = (props) => {
	const router = useRouter()

	return (
		<React.Fragment>
			<Head
				title={props.page.metaTitle}
				description={props.page.metaDescription}
				image="/sharing-selections.jpg"
				url={`https://prosazhin.ru` + `${router.pathname}`}
			/>
			<Header pages={props.pages} />
			<Container main>
				<Headline
                    title={props.page.title}
                    description={props.page.description}
					h1
                />
				<Tabs />
				<Tags
					tags={props.tags}
					page="selections"
				/>
			</Container>
			<Footer contacts={props.contacts} />

			<style jsx>{GlobalStyle}</style>
		</React.Fragment>
	)
}

Selections.getInitialProps = async () => {
	const page = await api.getOne('4FmC8blew6cpUdbOCZJjyK')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	const tags = await api.get({ content_type: 'tags', order: 'sys.createdAt' })
	const selections = await api.get({ content_type: 'selections' })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
		tags: tags.items,
		selections: selections.items,
	}
}

export default Selections