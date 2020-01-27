import React from 'react'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import Headline from '../components/headline'
import GlobalStyle from '../styles/base.scss'

import API from '../api'
const api = new API()



const Home = (props) => {
	// console.log(props.page)

	return (
		<React.Fragment>
			<Head
				title={props.page.metaTitle}
				description={props.page.metaDescription}
			/>
			<Header pages={props.pages} />
			<Container main>
				<Headline description={props.page.description} />
				<Headline title="Последние ссылки" />
			</Container>
			<Footer />

			<style jsx>{GlobalStyle}</style>
		</React.Fragment>
	)
}

Home.getInitialProps = async () => {
	const page = await api.getOne('22ziEi9xaIBiXD6mZ56r21')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	
	return {
		page: page.fields,
		pages: pages.items,
	}
}

export default Home