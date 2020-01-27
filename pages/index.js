import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Container from '../components/container'
import Tag from '../components/tag'
import GlobalStyle from '../styles/base.scss'

import API from '../api'
const api = new API()



const Home = (props) => {
	return (
		<React.Fragment>
			<Head title="Home" />
			<Nav />

			<Container main>
				<h1 className="title">Home</h1>

				{props.tags.length && props.tags.map((tag, index) =>
					<Tag
						key={index}
						title={tag.fields.title}
					/>
				)}
			</Container>
			<Footer />

			<style jsx>{GlobalStyle}</style>
		</React.Fragment>
	)
}

Home.getInitialProps = async () => {
	const result = await api.get({ content_type: 'tags', order: 'sys.createdAt' })
	return { tags: result.items }
}

export default Home