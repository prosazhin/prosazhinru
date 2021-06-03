
import React from 'react'
import Head from '../../utils/Head'
import {
    Header,
    Footer,
} from '..'



export default function MainWrapper({
    children,
	navigations,
    contacts,
    title,
    description,
    image,
    url,
	canonical,
}) {
	return (
		<>
			<Head
				title={title}
				description={description}
				image={image}
				url={url}
				canonical={canonical}
			/>
			<Header navigations={navigations} />
			{children}
			<Footer contacts={contacts} />
		</>
	)
}
