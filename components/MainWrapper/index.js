
import React from 'react'
import Head from '../../utils/head'
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
		<React.Fragment>
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
		</React.Fragment>
	)
}