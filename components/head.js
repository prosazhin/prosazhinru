import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = props => (
	<NextHead>
		<meta charSet="UTF-8" />
		<title>{props.title || ''}</title>
		<meta
			name="description"
			content={props.description || defaultDescription}
		/>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" href="/favicon.ico" />
		<meta property="og:url" content={props.url || defaultOGURL} />
		<meta property="og:title" content={props.title || ''} />
		<meta
			property="og:description"
			content={props.description || defaultDescription}
		/>
		<meta name="twitter:site" content={props.url || defaultOGURL} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={props.ogImage || defaultOGImage} />
		<meta property="og:image" content={props.ogImage || defaultOGImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />

		<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet" />
		{/* <meta name="yandex-verification" content="dd48801ed051b178" /> */}
		{/* <meta name="google-site-verification" content="X1xPf8-Oy5G7KQEJ3lGa94wRmqmFcYt8Qo535vK5szQ" /> */}

		<link href="/images/favicon.png" rel="icon" type="image/png" />
		<link href="/images/favicon.png" rel="icon" type="image/png" sizes="192x192" />
		<link href="/images/favicon.png" rel="apple-touch-icon" type="image/png" />
	</NextHead>
);

Head.propTypes = {
	title: string,
	description: string,
	url: string,
	ogImage: string,
};

export default Head;
