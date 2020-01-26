import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import Footer from '../components/footer';
import '../styles/base.scss';



const Home = () => {
	return (
		<React.Fragment>
			<Head title="Home" />
			<Nav />

			<main>
				<h1 className="title">Welcome to Next!</h1>
			</main>

			<Footer />
		</React.Fragment>
	);
};

export default Home;