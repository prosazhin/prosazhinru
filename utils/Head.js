import React from 'react'
import NextHead from 'next/head'



export default function Head({
	title,
	description,
	image,
	url,
	canonical,
}) {
	return (
		<NextHead>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={`https://prosazhin.ru` + `${url}`} />
			<meta property="og:image" content={image} />
			
			{canonical &&
				<link rel="canonical" href={`https://prosazhin.ru/` + `${canonical}`} />
			}
		</NextHead>
	)
}