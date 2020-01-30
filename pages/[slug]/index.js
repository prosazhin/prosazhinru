import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from '../../components/head'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Container from '../../components/container'
import Headline from '../../components/headline'
import Link from '../../components/link'
import GlobalStyle from '../../styles/base.scss'
import style from '../../styles/selections.scss'

import API from '../../api'
const api = new API()



const PageSelection = (props) => {
    const [selection, setSelection] = useState(null)
    const router = useRouter()

    console.log(selection)

    useEffect(() => {
		setSelection(props.selections.filter(item => item.fields.url === router.query.slug)[0])
	})
    
    return (
        <React.Fragment>
            <Head
				title={selection ? `${props.page.metaTitle} — ${selection.fields.title}` : props.page.metaTitle}
				description={selection ? selection.fields.description : props.page.metaDescription}
				image="/sharing-selections.jpg"
				url={`https://prosazhin.ru` + `${router.pathname}`}
			/>
            <Header pages={props.pages} />
            <Container main>
                {selection &&
                    <React.Fragment>
                        <Headline
                            title={selection ? selection.fields.title : ''}
                            description={selection ? selection.fields.description : ''}
                            h1
                        />
                        <div className="links">
                            {selection.fields.links.map(link =>
                                <Link
                                    link={link}
                                    key={link.sys.id}
                                />
                            )}
                        </div>
                    </React.Fragment>
                }
            </Container>
            <Footer contacts={props.contacts} />

            <style jsx>{GlobalStyle}</style>
            <style jsx>{style}</style>
        </React.Fragment>
    )
}

PageSelection.getInitialProps = async (ctx) => {
	const page = await api.getOne('4FmC8blew6cpUdbOCZJjyK')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
    const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
    const selections = await api.get({ content_type: 'selections', order: 'sys.createdAt' })
	
	return {
		page: page.fields,
		pages: pages.items,
        contacts: contacts.items,
        selections: selections.items,
	}
}
export default PageSelection