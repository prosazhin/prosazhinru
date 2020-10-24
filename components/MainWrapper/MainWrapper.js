import React from 'react'
import Head from '../../utils/Head'
import {
    Header,
    Footer,
    MainContainer,
} from '..'



export default function MainWrapper({
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
			<MainContainer>
                {children}
			</MainContainer>
			<Footer contacts={contacts} />
		</React.Fragment>
	)
}