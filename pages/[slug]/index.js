import React from 'react'
import { useRouter } from 'next/router'
import Head from '../../components/head'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Container from '../../components/container'
import Headline from '../../components/headline'
import GlobalStyle from '../../styles/base.scss'

import API from '../../api'
const api = new API()



const PageSelection = (props) => {
    const router = useRouter()
    
    return (
        <React.Fragment>
            <Head
				title={props.page.metaTitle}
				description={props.page.metaDescription}
				image="/sharing-selections.jpg"
				url={`https://prosazhin.ru` + `${router.pathname}`}
			/>
            <Header pages={props.pages} />
            <Container main>
                <Headline
                    title="111"
					h1
                />
            </Container>
            <Footer contacts={props.contacts} />

            <style jsx>{GlobalStyle}</style>
        </React.Fragment>
    )
}

PageSelection.getInitialProps = async () => {
	const page = await api.getOne('4FmC8blew6cpUdbOCZJjyK')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
	}
}
export default PageSelection