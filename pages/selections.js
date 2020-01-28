import React from 'react'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import Headline from '../components/headline'
import Tags from '../components/tags'
import GlobalStyle from '../styles/base.scss'

import API from '../api'
const api = new API()



const Selections = (props) => {
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
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
		tags: tags.items,
	}
}

export default Selections