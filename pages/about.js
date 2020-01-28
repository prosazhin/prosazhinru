import React from 'react'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import Headline from '../components/headline'
import GlobalStyle from '../styles/base.scss'

import API from '../api'
const api = new API()



const About = (props) => {
	return (
		<React.Fragment>
			<Head
				title={props.page.metaTitle}
				description={props.page.metaDescription}
			/>
			<Header pages={props.pages} />
			<Container main>
				<Headline description={props.page.description} />
			</Container>
			<Footer contacts={props.contacts} />

			<style jsx>{GlobalStyle}</style>
		</React.Fragment>
	)
}

About.getInitialProps = async () => {
	const page = await api.getOne('3JFErwJlyqQQvqF77kZ2K9')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
	}
}

export default About