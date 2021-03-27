import React from 'react'
import NextHead from 'next/head'



export default function Head({
	title,
	description,
	url,
	image,
}) {
	return (
		<NextHead>
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			<meta name="theme-color" content="#f2f3f4" />
			<meta name="format-detection" content="telephone=no" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="mobile-web-app-capable" content="yes" />
			<meta name="robots" content="index,follow" />
			<meta name="googlebot" content="index,follow" />
			<meta name="google" content="notranslate" />
			<link href="/favicon.png" rel="icon" type="image/png" />
			<link href="/favicon.png" rel="icon" type="image/png" sizes="192x192" />
			<link href="/favicon.png" rel="apple-touch-icon" type="image/png" />
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={image} />
			<link rel="preconnect" href="https://fonts.gstatic.com" /> 
			<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
			<meta name="yandex-verification" content="dd48801ed051b178" />
			<meta name="google-site-verification" content="oXkccV9eEltz10YzICaE33ZUFtjof1E4fFLFE4EgW-0" />
		</NextHead>
	)
}