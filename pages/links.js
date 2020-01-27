import React from 'react'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import Headline from '../components/headline'
import Tag from '../components/tag'
import GlobalStyle from '../styles/base.scss'
import style from '../styles/links.scss'

import API from '../api'
const api = new API()



const Links = (props) => {
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

				<ul className="tags">
					{props.tags.length && props.tags.map(tag =>
						<li
							className="tags__item"
							key={tag.sys.id}
						>
							<Tag
								title={tag.fields.title}
							/>
						</li>
					)}
				</ul>
			</Container>
			<Footer />

			<style jsx>{GlobalStyle}</style>
			<style jsx>{style}</style>
		</React.Fragment>
	)
}

Links.getInitialProps = async () => {
	const page = await api.getOne('5qalkcKCw8WrL6O1fRhhJ2')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const tags = await api.get({ content_type: 'tags', order: 'sys.createdAt' })
	
	return {
		page: page.fields,
		pages: pages.items,
		tags: tags.items,
	}
}

export default Links