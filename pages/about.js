import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Container from '../components/container'
import GlobalStyle from '../styles/base.scss'



const About = () => {
	return (
		<React.Fragment>
			<Head title="About" />
			<Nav />

			<Container main>
				<h1 className="title">About</h1>
			</Container>
			<Footer />

			<style jsx>{GlobalStyle}</style>
		</React.Fragment>
	)
}

export default About