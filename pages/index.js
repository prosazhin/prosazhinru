import React from 'react'
import { useRouter } from 'next/router'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import Headline from '../components/headline'
import ButtonLink from '../components/button'
import Link from '../components/link'
import GlobalStyle from '../styles/base.scss'
import style from '../styles/index.scss'

import API from '../api'
const api = new API()



const Home = (props) => {
	const router = useRouter()

	console.log(props.page)

	return (
		<React.Fragment>
			<Head
				title={props.page.metaTitle}
				description={props.page.metaDescription}
				image="/sharing-index.jpg"
				url={`https://prosazhin.ru` + `${router.pathname}`}
			/>
			<Header pages={props.pages} />
			<Container main>
				<Headline description={props.page.description} />
				<Headline title="Последние ссылки" />

				<div className="links">
					{props.links.map(link =>
						<Link
							link={link}
							key={link.sys.id}
						/>
					)}
				</div>
				<div className="button_wrapper">
					<ButtonLink
						title="Все ссылки"
						url="/links"
						target="_self"
					/>
				</div>
			</Container>
			<Footer contacts={props.contacts} />

			<style jsx>{GlobalStyle}</style>
			<style jsx>{style}</style>
		</React.Fragment>
	)
}

Home.getInitialProps = async () => {
	const page = await api.getOne('22ziEi9xaIBiXD6mZ56r21')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	const links = await api.get({ content_type: 'links', limit: 10, })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
		links: links.items,
	}
}

export default Home