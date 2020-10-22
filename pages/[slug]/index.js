import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '../../styles/pages/selections.module.scss'

import {
    Wrapper,
    Headline,
    Link,
} from '../../components'

import API from '../../api'
const api = new API()



function PageSelection(props) {
    const [selection, setSelection] = useState(null)
    const router = useRouter()

    useEffect(() => {
		setSelection(props.selections.filter(item => item.fields.url === router.query.slug)[0])
	})
    
    return (
        <Wrapper
            pages={props.pages}
            navigations={props.navigations}
			contacts={props.contacts}
			title={selection ? `${props.page.metaTitle} — ${selection.fields.title}` : props.page.metaTitle}
			description={selection ? selection.fields.description : props.page.metaDescription}
			image="/sharing-selections.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
            {selection &&
                <React.Fragment>
                    <Headline
                        title={selection ? selection.fields.title : ''}
                        description={selection ? selection.fields.description : ''}
                        h1
                    />
                    <div className={style.links}>
                        {selection.fields.links.map(link =>
                            <Link
                                link={link}
                                key={link.sys.id}
                            />
                        )}
                    </div>
                </React.Fragment>
            }
        </Wrapper>
    )
}



PageSelection.getInitialProps = async (ctx) => {
	const page = await api.getOne('4FmC8blew6cpUdbOCZJjyK')
    const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
    const navigations = await api.get({ content_type: 'navigations' })
    const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
    const selections = await api.get({ content_type: 'selections', order: 'sys.createdAt' })
	
	return {
		page: page.fields,
		pages: pages.items,
        contacts: contacts.items,
        selections: selections.items,
        navigations: navigations.items,
	}
}

export default PageSelection