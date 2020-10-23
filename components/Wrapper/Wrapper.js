import React from 'react'
import Head from '../../utils/Head'
import {
    Header,
    Footer,
    Container,
} from '../'



export default function Wrapper({
    children,
	navigations,
    contacts,
    title,
    description,
    image,
    url,
}) {
	return (
		<React.Fragment>
			<Head
				title={title}
				description={description}
				image={image}
				url={url}
			/>
			<Header navigations={navigations} />
			<Container main>
                {children}
			</Container>
			<Footer contacts={contacts} />
		</React.Fragment>
	)
}